import useLocalsSwip from "@/hooks/useLocalsSwip";
import { Button, Modal, Slider } from "antd";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import useTableStore from "./store/useTableStore";
import { toast } from "react-hot-toast";
import { css } from "@emotion/css";
import { Typography } from "@mui/material";
import clsx from "clsx";

interface Props {}

const ChangeImageBackground: NextPage<Props> = () => {
  const { LocalsSwip } = useLocalsSwip();
  const [Open, setOpen] = useState(false);
  const {
    setImageBackground,
    imageBackground,
    opacity,
    setOpacity,
    opacityTable,
    setOpacityTable,
  } = useTableStore((s) => s);

  const [Image, setImage] = useLocalStorage<string | null>(
    "ImageBackground",
    ""
  );

  const [valueOpacity, setValueOpacity] = useLocalStorage<number | null>(
    "ValueOpacity",
    null
  );

  const [valueOpacityTable, setValueOpacityTable] = useLocalStorage<
    number | null
  >("ValueOpacityTable", null);

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

  const onOpacityTable = (v: number) => {
    setValueOpacityTable(v);
    setOpacityTable(v);
  };

  useEffect(() => {
    if (Image) {
      setImageBackground(Image);
    }
  }, [Image]);

  useEffect(() => {
    if (valueOpacity) {
      setOpacity(valueOpacity);
    } else {
        setOpacity(0.5);
    }
  }, [valueOpacity]);

  useEffect(() => {
    if (valueOpacityTable) {
      setOpacityTable(valueOpacityTable);
    }else {
        setOpacityTable(0.5);
    }
  }, [valueOpacityTable]);

  return (
    <>
      <button
        className="btn-outline btn-primary btn-sm btn"
        onClick={() => setOpen((pre) => !pre)}
      >
        {LocalsSwip("เปลี่ยนรูปพื้นหลัง", "Change Image Background")}
      </button>
      <Modal
        open={Open}
        footer={[]}
        onCancel={() => setOpen(false)}
        title={LocalsSwip("เปลี้ยนรูปพื้นหลัง", "Change Image Background")}
      >
        <div className="flex flex-col gap-3">
          {imageBackground && (
            <div className="relative h-[20rem] flex justify-center items-center">
              <div className={clsx("z-20 relative flex p-10",css`
                    border-left: 5px solid #c7117f;
                    background-color: hsl(var(--b2, var(--b1)) / ${imageBackground ? opacityTable : "1"});
              `)}>
                test
              </div>
              <img
                src={imageBackground}
                className={clsx(
                  css`
                    opacity: ${imageBackground ? opacity : "0.5"};
                  `,
                  "absolute top-0 left-0 z-0 h-full w-full object-cover object-center"
                )}
              />
            </div>
          )}
          {imageBackground && (
            <div className="flex flex-col">
              <div className="flex flex-col">
                <Typography>
                  {LocalsSwip(
                    "ปรับความโปรใสภาพพื้นหลัง",
                    "Adjustment Transparent Background"
                  )}
                </Typography>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={opacity ? opacity : 0.5}
                  onChange={(v) => onOpacity(v)}
                />
              </div>
              <div className="flex flex-col">
                <Typography>
                  {LocalsSwip(
                    "ปรับความโปรใสตาราง",
                    "Adjustment Transparent Table"
                  )}
                </Typography>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={opacityTable ? opacityTable : 0.5}
                  onChange={(v) => onOpacityTable(v)}
                />
              </div>
            </div>
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
