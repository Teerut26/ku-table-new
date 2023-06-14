import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Button, Modal, Slider } from "antd";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import useTableStore from "./store/useTableStore";
import { toast } from "react-hot-toast";
import { css } from "@emotion/css";

interface Props {}

const ChangeImageBackground: NextPage<Props> = () => {
  const { LocalsSwip } = useLocalsSwip();
  const [Open, setOpen] = useState(false);
  const { setImageBackground, imageBackground, opacity, setOpacity } =
    useTableStore((s) => s);
  const [Image, setImage] = useLocalStorage<string | null>(
    "ImageBackground",
    ""
  );
  const [valueOpacity, setValueOpacity] = useLocalStorage<number | null>(
    "ValueOpacity",
    null
  );

  const onClear = () => {
    setImageBackground(null);
    setImage(null);
    setOpen(false);
  };

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!fileValidImage(e.target.files?.[0]!)) {
      return toast.error(LocalsSwip("รูปภาพไม่ถูกต้อง", "Invalid Image"));
    }
    const imageBase64 = (await imageToBase64(e.target.files?.[0]!)) as string;

    setImageBackground(imageBase64);
    setImage(imageBase64);
    setOpen(false);
  };

  const fileValidImage = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const imageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onOpacity = (v: number) => {
    setValueOpacity(v);
    setOpacity(v);
  };

  useEffect(() => {
    if (Image) {
      setImageBackground(Image);
    }
  }, [Image]);

  useEffect(() => {
    if (valueOpacity) {
      setOpacity(valueOpacity);
    }
  }, [valueOpacity]);

  return (
    <>
      <button
        className="btn-outline btn-primary btn-sm btn"
        onClick={() => setOpen((pre) => !pre)}
      >
        {LocalsSwip("เปลี้ยนรูปพื้นหลัง", "Change Image Background")}
      </button>
      <Modal
        open={Open}
        footer={[]}
        onCancel={() => setOpen(false)}
        title={LocalsSwip("เปลี้ยนรูปพื้นหลัง", "Change Image Background")}
      >
        <div className="flex flex-col gap-3">
          {imageBackground && (
            <img
              src={imageBackground}
              className={css`
                opacity: ${imageBackground ? opacity : "0.5"};
              `}
            />
          )}
          {imageBackground && (
            <Slider
              min={0}
              max={1}
              onChange={(v) => onOpacity(v)}
              value={opacity!}
              step={0.01}
            />
          )}
          {imageBackground ? (
            <>
              <Button danger onClick={onClear}>
                {LocalsSwip("ลบรูปพื้นหลัง", "Delete Image Background")}
              </Button>
            </>
          ) : (
            <input type="file" onChange={onUpload} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ChangeImageBackground;
