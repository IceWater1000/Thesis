export function switchState(b: HTMLImageElement, c: string): null {
  switch (c) {
    case "Dashboard":
      b.src = "/Images/White/dashboard.png";
      break;
    case "Residents-Information":
      b.src = "/Images/White/database-storage.png";
      break;
    case "Household-Record":
      b.src = "/Images/White/house.png";
      break;
    case "Household-Members":
      b.src = "/Images/White/Household.png";
      break;
    case "Senior-Citizens":
      b.src = "/Images/White/SeniorCitizen.png";
      break;
    case "KK-Members":
      b.src = "/Images/White/SK.png";
      break;
    case "Lupon-Records":
      b.src = "/Images/White/auction.png";
      break;
    case "Certificate-Issuances":
      b.src = "/Images/White/certificate.png";
      break;

    case "View-Logs":
      b.src = "/Images/White/files.png";
      break;

    default:
      break;
  }

  return null;
}
export function switchStateBack(
  a: string,
  b: HTMLImageElement,
  c: string
): null {
  if (a === "sideBarButton active") {
    null;
  } else {
    switch (c) {
      case "Dashboard":
        b.src = "/Images/Blue/dashboard.png";
        break;
      case "Residents-Information":
        b.src = "/Images/Blue/database-storageBlue.png";
        break;
      case "Household-Record":
        b.src = "/Images/Blue/house.png";
        break;
      case "Household-Members":
        b.src = "/Images/Blue/Household.png";
        break;
      case "Senior-Citizens":
        b.src = "/Images/Blue/SeniorCitizen.png";
        break;
      case "KK-Members":
        b.src = "/Images/Blue/SK.png";
        break;
      case "Lupon-Records":
        b.src = "/Images/Blue/auction.png";
        break;
      case "Certificate-Issuances":
        b.src = "/Images/Blue/certificate.png";
        break;
      case "View-Logs":
        b.src = "/Images/Blue/files.png";
        break;

      default:
        break;
    }
  }

  return null;
}
