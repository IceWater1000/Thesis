import React, { useState } from "react";

let [Datas, setData] = useState("");
export function editData(item: string) {
  setData(item);
  return null;
}
export function getData() {
  return Datas;
}
