import ky from "ky-universal";

export default ky.create({
    prefixUrl: "https://jsonplaceholder.typicode.com",
});