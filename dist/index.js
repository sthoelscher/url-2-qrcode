"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const valid_url_1 = __importDefault(require("valid-url"));
const qrcode_1 = __importDefault(require("qrcode"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
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
app.post("/generate-qr-code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!valid_url_1.default.isUri(url)) {
        return res.send("Error: Not a well formatted URL");
    }
    const qrCode = yield qrcode_1.default.toDataURL(url);
    res.send(`
      <img src="${qrCode}" />
    `);
}));
