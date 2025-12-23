"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Download, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function QRCodeGenerator() {
  const [text, setText] = useState("https://toolfixo.online");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("L");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      a.click();
      toast.success("QR Code downloaded successfully");
    }
  };

  const handleCopy = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard
            .write([new ClipboardItem({ "image/png": blob })])
            .then(() => {
              toast.success("QR Code copied to clipboard");
            })
            .catch(() => {
              toast.error("Failed to copy QR Code");
            });
        }
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Size ({size}px)</Label>
              <Slider
                value={[size]}
                onValueChange={(vals) => setSize(vals[0])}
                min={128}
                max={512}
                step={32}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fgColor">Foreground</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="fgColor"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 p-1 px-1"
                  />
                  <Input
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="uppercase"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bgColor">Background</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 p-1 px-1"
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="uppercase"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Error Correction Level</Label>
              <Tabs
                defaultValue="L"
                value={level}
                onValueChange={(v) => setLevel(v as "L" | "M" | "Q" | "H")}
                className="mt-2"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="L">L (7%)</TabsTrigger>
                  <TabsTrigger value="M">M (15%)</TabsTrigger>
                  <TabsTrigger value="Q">Q (25%)</TabsTrigger>
                  <TabsTrigger value="H">H (30%)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-8 flex flex-col items-center justify-center bg-white/5 min-h-[400px]">
          <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-lg">
            <QRCodeCanvas
              value={text}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              level={level}
              includeMargin={true}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Scan with your phone camera to test
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleDownload} className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download PNG
          </Button>
          <Button onClick={handleCopy} className="w-full">
            <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
}
