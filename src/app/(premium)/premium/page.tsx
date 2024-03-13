import React from "react";
import BuyPremium from "./_components/buyPremium";
import TypographyH1 from "@/components/ui/typography/h1";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TypographyH3 from "@/components/ui/typography/h3";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PremiumPage = () => {
  return (
    <div className="container mt-12">
      <TypographyH1>Получи все курсы. С одной подпиской.</TypographyH1>
      <p className="text-xl mt-2 text-muted-foreground">
        Доступ ко всем курсам по веб разработке. Всего лишь с одной подпиской.
      </p>
      <div className="flex gap-8 mt-8">
        <Card className="w-2/3">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div>
                <h3 className=" scroll-m-20 text-xl font-bold ">
                  Подписка на 1 месяц
                </h3>
                <p>Доступ ко всем курсам. Так же все функции.</p>
              </div>

              <Badge
                variant={"secondary"}
                className="uppercase whitespace-nowrap"
              >
                1 Месяц
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="border-b">
            <div className="flex items-center gap-4 justify-center p-6 border  rounded-md ">
              <h3 className="text-5xl font-bold tracking-tighter">50,000 ₸</h3>
              <div className="h-full flex flex-col justify-between">
                <p className="font-semibold">Так же все функции.</p>
                <p className="text-muted-foreground">Доступ ко всем курсам. </p>
              </div>
            </div>
            <div>
              <ul className="flex flex-col gap-4 p-6">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="text-primary" />
                  <span className="text-lg">Доступ ко всем курсам</span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="text-primary" />
                  <span className="text-lg">Доступ ко всем курсам</span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="text-primary" />
                  <span className="text-lg">Доступ ко всем курсам</span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="text-primary" />
                  <span className="text-lg">Доступ ко всем курсам</span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="text-primary" />
                  <span className="text-lg">Доступ ко всем курсам</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="bg-muted p-4">
            <BuyPremium></BuyPremium>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-8">
          <div>
            <TypographyH3>What are the limits of the Free plan?</TypographyH3>
            <p>
              The free plan gives you access to the templates library and
              personal templates. You cannot build custom templates on the free
              plan.
            </p>
          </div>
          <div>
            <TypographyH3>Whats included in the Pro plan?</TypographyH3>
            <p>
              The Pro plan gives you access to the templates library and
              personal templates. You also get full access to the designer tools
              to design your custom posts from scratch.
            </p>
          </div>
          <div>
            <TypographyH3>
              Can I use the templates for commercial purposes?
            </TypographyH3>
            <p>
              Yes, you can use all templates for commercial and personal
              purposes.
            </p>
          </div>
          <div>
            <TypographyH3>What payments method do you accept?</TypographyH3>
            <p>We accept credit cards and PayPal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
