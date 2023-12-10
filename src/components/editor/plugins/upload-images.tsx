import { PutBlobResult } from "@vercel/blob";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
import { supabase } from "@/lib/supabase";

const uploadKey = new PluginKey("upload-image");

const MAX_FILE_SIZE_MB = 20;

const createPlaceholder = (type: string, src: string) => {
  const placeholder = document.createElement("div");
  placeholder.setAttribute("class", "img-placeholder");

  if (type === "image") {
    const image = document.createElement("img");
    image.setAttribute(
      "class",
      "opacity-40 rounded-lg border border-stone-200"
    );
    image.src = src;
    placeholder.appendChild(image);
  }

  if (type === "file") {
    const download = document.createElement("a");
    download.setAttribute("href", "#");
    download.textContent = "Привет";
    placeholder.appendChild(download);
  }

  return placeholder;
};

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        const action = tr.getMeta(this as any);

        if (action && action.add) {
          const { id, pos, src, type } = action.add;
          const placeholder = createPlaceholder(type, src);
          const deco = Decoration.widget(pos + 1, placeholder, { id });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(
              undefined,
              undefined,
              (spec) => spec.id == action.remove.id
            )
          );
        }

        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugin;

function findPlaceholder(state: EditorState, id: object) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id == id);
  return found.length ? found[0].from : null;
}

export function startImageUpload(file: File, view: EditorView, pos: number) {
  const isImage = file.type.includes("image/");
  if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
    // toast.error("File size too big (max 20MB).");
    return;
  }

  const id = {} as any;
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (el) => {
    tr.setMeta(uploadKey, {
      add: {
        id,
        type: isImage ? "image" : "file",
        pos,
        src: reader.result,
      },
    });

    view.dispatch(tr);
  };

  const handleUpload = isImage ? handleImageUpload : handleFileUpload;
  handleUpload(file).then((src) => {
    const { schema } = view.state;
    let pos = findPlaceholder(view.state, id);
    if (pos == null) return;

    const url = typeof src === "object" ? reader.result : src;
    const node = schema.nodes[isImage ? "image" : "downloadFile"].create(
      isImage ? { src: url } : { fileUrl: url, fileName: file.name }
    );
    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });
    view.dispatch(transaction);
  });
}

const handleFileUpload = async (
  file: File,
  bucketName: string = "lessons-content"
) => {
  return new Promise(async (resolve) => {
    const [filename, fileExt] = file.name.split(".");
    const filepath = `${filename}-${Math.random()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filepath, file);
    if (error) throw new Error(error.message);
    const url = data?.path;
    const res = supabase.storage.from(bucketName).getPublicUrl(url);

    const publicUrl = res.data.publicUrl;
    resolve(publicUrl);
  });
};

const handleImageUpload = async (
  file: File,
  bucketName: string = "lessons-content"
) => {
  return new Promise(async (resolve) => {
    const [filename, fileExt] = file.name.split(".");
    const filepath = `${filename}-${Math.random()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filepath, file);
    if (error) throw new Error(error.message);
    const url = data?.path;
    const res = supabase.storage.from(bucketName).getPublicUrl(url);

    const publicUrl = res.data.publicUrl;
    const img = new Image();
    img.src = publicUrl;
    img.onload = function () {
      resolve(publicUrl);
    };
  });
};
