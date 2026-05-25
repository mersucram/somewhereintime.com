const NAV_LABELS = {

  home: "Home",

  about: "About",

  contact: "Contact",

  recentAquisitions: "Recent Aquisitions",

  artAndCollectables: "Art and Collectables",

  collectables: "Collectables",

  fineArt: "Fine Art",

  antiques: "Antiques",

  jewelry: "Jewelry",

  literature: "Literature",

};



const TOP_LEVEL_ORDER = [

  "home",

  "about",

  "contact",

  "recentAquisitions",

  "artAndCollectables",

];



const ART_SUB_ORDER = [

  "collectables",

  "fineArt",

  "antiques",

  "jewelry",

  "literature",

];



/** Legacy API keys from JsonPropertyName attributes before camelCase alignment. */

const LEGACY_NAV_KEYS = {

  recentAquisitions: ["Recent Aquisitions"],

  artAndCollectables: ["Art and Collectables"],

};



const LEGACY_CHILD_KEYS = {

  fineArt: ["Fine Art"],

};



export function toPath(tildePath) {

  if (!tildePath || tildePath === "~/") {

    return "/";

  }

  return tildePath.replace(/^~\//, "/");

}



function resolveNavValue(source, key) {

  if (!source) {

    return null;

  }



  if (source[key] != null && source[key] !== "") {

    return source[key];

  }



  const label = NAV_LABELS[key];

  if (label && source[label] != null && source[label] !== "") {

    return source[label];

  }



  for (const legacyKey of LEGACY_NAV_KEYS[key] ?? []) {

    if (source[legacyKey] != null && source[legacyKey] !== "") {

      return source[legacyKey];

    }

  }



  return null;

}



function resolveChildPath(group, childKey) {

  if (!group) {

    return null;

  }



  if (group[childKey]) {

    return group[childKey];

  }



  const label = NAV_LABELS[childKey];

  if (label && group[label]) {

    return group[label];

  }



  for (const legacyKey of LEGACY_CHILD_KEYS[childKey] ?? []) {

    if (group[legacyKey]) {

      return group[legacyKey];

    }

  }



  return null;

}



export function buildMenuItems(navigation) {

  if (!navigation) {

    return [];

  }



  return TOP_LEVEL_ORDER.map((key) => {

    const value = resolveNavValue(navigation, key);

    if (value == null || value === "") {

      return null;

    }



    if (typeof value === "string") {

      return {

        key,

        label: NAV_LABELS[key] ?? key,

      href: toPath(value),
      iconKey: key,

      };

    }



    const children = ART_SUB_ORDER.map((childKey) => {

      const path = resolveChildPath(value, childKey);

      if (!path) {

        return null;

      }



      return {

        key: childKey,

        label: NAV_LABELS[childKey] ?? childKey,

        href: toPath(path),

      };

    }).filter(Boolean);



    if (children.length === 0) {

      return null;

    }



    return {

      key,

      label: NAV_LABELS[key] ?? key,
      iconKey: key,

      children,

    };

  }).filter(Boolean);

}

