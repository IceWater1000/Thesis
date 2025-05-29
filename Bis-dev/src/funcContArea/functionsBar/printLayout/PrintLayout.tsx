import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
import "./PrintLayout.css";
import axios from "axios";
import { object } from "framer-motion/client";

interface Props {
  url: string;
  onItemClick: () => void;
  name: string;
}
const PrintLayout = ({ onItemClick, url, name }: Props) => {
  const [data, setData] = useState<any[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const handleDownloadPdf = () => {
    if (componentRef.current) {
      const options = {
        filename: "Document.pdf",
        jsPDF: {
          unit: "pt",
          format: "a4",
          orientation: "landscape",
        },
        html2canvas: {
          scale: 3, // 7 is usually overkill and makes big files
          useCORS: true,
        },
        margin: [40, 40, 40, 40], // top, left, bottom, right padding (in points)
      };

      html2pdf().set(options).from(componentRef.current).save();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        setData(response.data);
      } catch (err) {
        console.log("Error");
      }
    };

    fetchData();
  }, []);
  return (
    <div className="WorkloadTablePrintLayout">
      <div className="WamTopBar">
        <div className="WamTopBarText Text2">Print Layout</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            onClick={handleDownloadPdf}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src="/Images/print.png"
            />
          </div>
          <div
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "auto",
              cursor: "pointer",
            }}
            onClick={onItemClick}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src="/Images/cross.png"
            />
          </div>
        </div>
      </div>

      <div className="PrintWorkloadTableWrapper" ref={componentRef}>
        <div className="PrintLayoutTitle">{name}</div>
        <table>
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) =>
                  index == 12 ? (
                    ""
                  ) : key === "NewBarangay" ? (
                    ""
                  ) : (
                    <>
                      <th className="thContent" key={`header-${key}-${index}`}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                          }}
                        >
                          {key}
                        </div>
                      </th>
                    </>
                  )
                )}
            </tr>
          </thead>

          <tbody>
            {data.map((item: any, rowIndex: number) => (
              <tr
                key={`row-${rowIndex}`}
                style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
              >
                {Object.values(item).map((value, cellIndex) => (
                  <td key={`cell-${rowIndex}-${cellIndex}`}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintLayout;
