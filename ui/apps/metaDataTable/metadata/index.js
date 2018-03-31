import assets from "./assets.json"
import logs from "./logs.json";

function Metadata(name) {
  if (name == "assets") return assets;
  else if (name == "logs") return logs;
  else throw new Error(name + " not found in Metadata");
}

export default Metadata
