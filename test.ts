import axios from "axios";
import { createReadStream, createWriteStream, readFileSync, writeFileSync, stre } from "fs";

const data = readFileSync("./img.jpg");
console.log(data);

const ss = createWriteStream("manga.jpg");

axios("http://localhost:3000/api/post", {
  method: "POST",
  data: {
    id: "B0BT5LLBM5",
    title: "Mesa de Centro Decorativa Sala Estar e TV - Perola/Nature - Wandinha - TuttiCasa",
    image: "https://m.media-amazon.com/images/I/41ZOUOpgQvL._SX800,800.jpg",
    image_alt: "https://m.media-amazon.com/images/I/41ZOUOpgQvL._AC_SR400,600_.jpg",
    price: 20368,
    original_price: 22632,
    discount: 10,
  },
  // data: {
  //   id: "6559825817",
  //   title: "Chainsaw Man Vol. 11",
  //   image: "https://m.media-amazon.com/images/I/61F4SqkdNwL._SX800,800.jpg",
  //   image_alt: "https://m.media-amazon.com/images/I/61F4SqkdNwL._AC_UY218_.jpg",
  //   price: 2420,
  //   original_price: 3390,
  //   discount: 29,
  // },
  responseType: "arraybuffer",
  // responseType: "stream",
})
  .then(({ data }) => {
    // data.pipe(ss);
    console.log(data);
    return data;
  })
  .then((img) => writeFileSync("centro.png", img));
