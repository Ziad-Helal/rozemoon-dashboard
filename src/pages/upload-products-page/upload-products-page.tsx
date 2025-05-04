import * as XLSX from "xlsx";
import { Form_Page } from "@/components/layouts";
import { Button } from "@/components/ui";
import { cn, fetchImageAsFile } from "@/lib/utils";
import { CreateProduct_Request } from "@/types/api-types";
import { ChangeEvent, useEffect, useState } from "react";
import { createProduct } from "@/lib/api";
import { UploadIcon } from "lucide-react";
import imagePlaceholder from "/images/flower-placeholder.jpg";
import { emptyProduct } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { formatNumber, Language } from "@/localization";

export default function UploadProducts_Page() {
  const { t, i18n } = useTranslation();
  const [uploadedProducts, setUploadedProducts] = useState<CreateProduct_Request[]>([]);
  const [startCreating, setStartCreating] = useState(false);
  const [createdProductsCount, setCreatedProductsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const uploadedProductsPercentage = createdProductsCount / uploadedProducts.length;

  function downloadHandler() {
    const workSheet = XLSX.utils.json_to_sheet([emptyProduct]);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet);
    XLSX.writeFile(workBook!, "products creation template.xlsx");
  }

  function uploadHandler(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workBook = XLSX.read(data, { type: "array" });
        const sheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(workSheet) as CreateProduct_Request[];
        setUploadedProducts(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  useEffect(() => {
    (async function () {
      const imageFile = await fetchImageAsFile(imagePlaceholder);
      setImageFile(imageFile);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (uploadedProducts.length && startCreating) {
        setIsLoading(true);
        for (let i = 0; i < uploadedProducts.length; i++) {
          const success = await createProduct({ ...uploadedProducts[i], files: [imageFile!, imageFile!, imageFile!, imageFile!] })
            .then(() => true)
            .catch(() => false);
          if (success) setCreatedProductsCount((prevCount) => prevCount + 1);
          else break;
        }
        setStartCreating(false);
        setIsLoading(false);
      }
    })();
  }, [uploadedProducts, startCreating]);

  return (
    <Form_Page heading={t("forms.product.uploadHeading")}>
      <input type="file" id="productsFile" className="hidden" onChange={uploadHandler} accept=".xlsx" />
      <div className="flex gap-2">
        <Button variant="secondary" leftIcon={UploadIcon} className="flex-1" onClick={() => document.getElementById("productsFile")?.click()}>
          {t("pages.uploadProducts.uploadInBulk")}
        </Button>
        <Button variant="outline" onClick={downloadHandler}>
          {t("pages.uploadProducts.downloadTemplate")}
        </Button>
      </div>
      {uploadedProducts.length ? (
        <div>
          <p className="border p-3 pt-0 mt-3 rounded-lg">
            <span className="relative block w-full mt-2 mb-8 h-1">
              <span className={cn("block size-full rounded-full animate-pulse", isLoading ? "bg-primary/50" : "")} />
              <span
                className="absolute inset-0 bg-primary rounded-full transition-all"
                style={{ width: formatNumber("en", uploadedProductsPercentage, "percent", undefined, undefined, undefined, true) as string }}
              />
              <span className="absolute top-1 left-1/2 -translate-x-1/2">{formatNumber(i18n.language as Language, uploadedProductsPercentage, "percent")}</span>
            </span>
            <span className="flex items-center justify-between">
              <span className="capitalize text-lg font-medium">{t("pages.uploadProducts.uploadedProducts")}</span>
              <span className="text-sm bg-primary px-3 py-1 rounded-lg text-white dark:text-black">
                {formatNumber(i18n.language as Language, createdProductsCount, "decimal")} / {formatNumber(i18n.language as Language, uploadedProducts.length, "decimal")}
              </span>
            </span>
          </p>
          {createdProductsCount == uploadedProducts.length || (
            <Button className="ms-auto mt-1 px-10" onClick={() => setStartCreating(true)} isLoading={isLoading}>
              {t("keyWords.upload")}
            </Button>
          )}
        </div>
      ) : null}
    </Form_Page>
  );
}
