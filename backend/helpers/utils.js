export const checkIfNoMidification = (o1, o2) => {
  let keys1 = Object.keys(o1);
  let keys2 = Object.keys(o2);

  if (keys1.length != keys2.length) return false;

  for (let i of keys1) {
    if (typeof o1[i] === "object") {
      let a1 = JSON.stringify(o1[i]);
      let a2 = JSON.stringify(o2[i]);

      console.log(a1, a2, a1 != a2);
      if (a1 != a2) return false;
    } else {
      if (o1[i] != o2[i]) return false;
    }
  }

  return true;
};
