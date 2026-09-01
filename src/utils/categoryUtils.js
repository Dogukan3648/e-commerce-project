const createCategorySlug = (value) =>
  value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getCategoryPath = (category) => {
  const gender = category.gender === "k" ? "kadin" : "erkek";
  const categoryName = createCategorySlug(category.code.split(":")[1]);

  return `/shop/${gender}/${categoryName}/${category.id}`;
};
