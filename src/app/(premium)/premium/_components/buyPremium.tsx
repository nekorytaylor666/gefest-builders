"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/hooks/useUserSession";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";

const BuyPremium = () => {
  const { data } = useUser();
  const buyPremium = trpc.user.buyPremium.useMutation();
  const router = useRouter();

  console.log(data);
  const pay = () => {
    //@ts-ignore
    var widget = new cp.CloudPayments();
    widget.pay(
      "auth", // или 'charge'
      {
        //options
        publicId: "test_api_00000000000000000000002", //id из личного кабинета
        description: "Покупка подписки в Gefest Builders", //назначение
        amount: 50000, //сумма
        currency: "KZT", //валюта
        accountId: data?.user?.id?.toString(), //идентификатор плательщика (необязательно)
        invoiceId: "1234567", //номер заказа  (необязательно)
        email: data?.user?.email?.toString(), //email плательщика (необязательно)
        skin: "mini", //дизайн виджета (необязательно)
        autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
        data: {
          myProp: "myProp value",
        },
        payer: {
          firstName: "Тест",
          lastName: "Тестов",
          middleName: "Тестович",
          birth: "1955-02-24",
          address: "тестовый проезд дом тест",
          street: "Lenina",
          city: "MO",
          country: "KZ",
          phone: "123",
          postcode: "345",
        },
      },
      {
        onSuccess: async function (options: any) {
          console.log(options);
          if (!options.accountId) return;
          await buyPremium.mutateAsync({ userId: options.accountId });
          console.log("buy premium");
          await supabase.auth.refreshSession();
          router.replace("/courses/1");
          console.log(options);
        },
        //@ts-ignore
        onFail: function (reason, options) {
          // fail
          //действие при неуспешной оплате
        },
        //@ts-ignore
        onComplete: function (paymentResult, options) {
          //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
          //например вызов вашей аналитики
        },
      }
    );
  };
  const onBuyPremium = async () => {
    pay();
  };

  return (
    <Button size={"lg"} className="w-full text-lg" onClick={onBuyPremium}>
      Buy Premium
    </Button>
  );
};

export default BuyPremium;
