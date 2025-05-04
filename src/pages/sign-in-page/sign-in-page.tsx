import { SignIn_Form } from "@/components/forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useTranslation } from "react-i18next";

export default function SignIn_Page() {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="capitalize font-medium text-3xl md:text-4xl">{t("pages.signIn")}</CardTitle>
      </CardHeader>
      <CardContent>
        <SignIn_Form />
      </CardContent>
    </Card>
  );
}
