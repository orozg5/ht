export default function getStatus(e: string) {
  if (e == "initialized") {
    return "Inicijalizirano";
  } else if (e == "inProcess") {
    return "U tijeku";
  } else if (e == "processed") {
    return "Obrađeno";
  } else if (e == "shipped") {
    return "Poslano";
  } else if (e == "inCustoms") {
    return "Na carini";
  } else if (e == "delivered") {
    return "Isporučeno";
  } else if (e == "returned") {
    return "Vraćeno";
  } else {
    return "Greška";
  }
}
