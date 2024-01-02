import postgres from "postgres";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("Couldn't find db url");
}
const sql = postgres(dbUrl);

async function main() {
  await sql`
        create or replace function public.handle_new_user()
        returns trigger as $$
        begin
            insert into public."User" (id, email, "fullName", "externalSourceUserId", "externalMetadata", "createdAt", "updatedAt")
            values (new.id, new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'provider_id', json_build_object('avatar_url', new.raw_user_meta_data->>'avatar_url', 'email_verified', new.raw_user_meta_data->>'email_verified', 'phone_verified', new.raw_user_meta_data->>'phone_verified'), now(), now());
            
            perform public.set_claim(new.id, 'claims_admin', 'false');
            return new;
        end;
        $$ language plpgsql security definer;
        `;
  await sql`
        create or replace trigger on_auth_user_created
            after insert on auth.users
            for each row execute procedure public.handle_new_user();
      `;

  await sql`
        create or replace function public.handle_user_delete()
        returns trigger as $$
        begin
          delete from auth.users where id = old.id;
          return old;
        end;
        $$ language plpgsql security definer;
      `;

  await sql`
        create or replace trigger on_profile_user_deleted
          after delete on public."User"
          for each row execute procedure public.handle_user_delete()
      `;

  console.log("Finished adding triggers and functions for profile handling.");
  process.exit();
}

main();
