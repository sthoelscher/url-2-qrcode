import express from "express";
import validUrl from "valid-url";
import qrcode from "qrcode";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("Service is listening on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send(`
    <form action="/generate-qr-code" method="post">
      <input type="text" name="url" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/generate-qr-code", async (req, res) => {
  const { url } = req.body;
  if (!validUrl.isUri(url)) {
    return res.send("Error: Not a well formatted URL");
  }

  const qrCode = await qrcode.toDataURL(url);
  res.send(`
      <img src="${qrCode}" />
    `);
});
