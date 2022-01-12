import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import EditorJS from "@editorjs/editorjs";
import { defaultData as data } from "../components/data";
import { tools } from "../components/tools";
import { sampleBlog } from "../components/sampleBlog";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNjMWI3YTljOGIxNjNhMzhhY2E0MWMiLCJpYXQiOjE2NDE2MjAwMTR9.mrbf1KADsPc67iabuEGWxyv2MMzgLjHI1co5WmhBymM";
function onSaveHandler(data, setPageJson) {
  console.log(data);
  const blogJson = JSON.stringify(sampleBlog);
  setPageJson(data);
  console.log(blogJson);
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(sampleBlog),
    signal: controller.signal,
  };
  fetch("https://backend.cseanitw.in/api/addBlog", requestOptions)
    .then((res) => {
      if (!res.ok) {
        console.log(res);
        throw new Error("response is not ok");
      }
      return res.json();
    })
    .then((val) => console.log(val))
    .catch((err) => {
      console.log(err);
      // window.location.href = '/';
    })
    .finally(() => clearTimeout(id));
}

function Editor() {
  // const [pageTitle,setPageTitle] = useState('');
  // const [pageUrl,setPageUrl] = useState('')
  const [pageJson, setPageJson] = useState(data);
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    setEditor(
      new EditorJS({
        readOnly: false,
        holder: "editorjs",
        tools: tools,
        data: data,
      })
    );
  }, []);

  return (
    <div
      className="Editor"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ margin: "10px" }}>
        <button
          onClick={() => {
            editor
              .save()
              .then((outputdata) => {
                sampleBlog.blocks = outputdata.blocks;
                console.log(sampleBlog);
                onSaveHandler(outputdata, setPageJson);
              })
              .catch((err) => {
                console.log("ERROR");
                console.log(err);
              });
          }}
        >
          Save the data
        </button>
      </div>
      <div style={{ margin: "10px" }}>
        <TextField
          id="standard-json"
          label="Your json"
          value={JSON.stringify(sampleBlog)}
          multiline
          // maxRows={4}
          fullWidth
        />
      </div>
      <div id="editorjs"></div>
    </div>
  );
}

export default Editor;
