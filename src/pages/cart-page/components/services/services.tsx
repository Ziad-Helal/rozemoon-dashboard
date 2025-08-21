import { ToolTip } from "@/components";
import { OrderService_Form } from "@/components/forms";
import { Button } from "@/components/ui";
import { useQuerySubscribe } from "@/hooks/misc";
import { queryKeys, useUpdateFastOrderCartServices } from "@/queries";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { FastOrder_Cart, Service } from "@/types/api-types";

interface Services_Props {}

export default function Services({}: Services_Props) {
  const { t } = useTranslation();
  const { mutate: updateCart } = useUpdateFastOrderCartServices();
  const services = useQuerySubscribe<FastOrder_Cart>([queryKeys.fastOrderCart])!.services;
  const [forms, setForms] = useState([Date.now().toString(36)]);

  console.log(services);

  function updateCartServices(index: number, newService?: Service) {
    const newServices = services ? [...services] : [];
    if (newService) newServices[index] = newService;
    else newServices.splice(index, 1);
    updateCart(newServices);
  }

  function createNewService() {
    setForms((prevForms) => [...prevForms, Date.now().toString(36)]);
  }

  function deleteService(index: number) {
    updateCartServices(index);
    setForms((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
  }

  return (
    <section className="space-y-2">
      <div className="text-end">
        <Button variant="link" size="sm" className="p-0 h-5 text-foreground/75" disabled={forms.length - (services?.length || 0) == 1} onClick={createNewService}>
          {t("pages.cart.serviecs.add")}
        </Button>
      </div>
      {forms.map((id, index) => (
        <div key={id} className="grid gap-2 grid-cols-[1fr_auto] items-end">
          <OrderService_Form onSubmit={(newService) => updateCartServices(index, { service: newService.service, value: newService.value! })} />
          <ToolTip
            content={t("pages.cart.serviecs.delete")}
            trigger={
              <Button variant="destructive" size="icon" icon={Trash2Icon} onClick={() => deleteService(index)} disabled={forms.length == 1}>
                {t("pages.cart.serviecs.delete")}
              </Button>
            }
          />
        </div>
      ))}
    </section>
  );
}
