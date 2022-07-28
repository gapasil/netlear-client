export const getFullCourseCost = (arr) => {
  console.log(arr);
  let currentSum = 0;
  arr.forEach((el, i) => (currentSum += el.cost));
  const fullCost = Math.ceil(currentSum);
  const costAbjustment = fullCost - 0.01;
  return costAbjustment;
};

export const getFullCourseCostWithDiscount = (cost, discount) => {
  const costWithDiscount = Math.ceil(cost - (cost / 100) * discount);
  const costAbjustment = costWithDiscount - 0.01;
  return costAbjustment;
};
