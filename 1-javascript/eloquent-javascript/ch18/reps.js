document.addEventListener("DOMContentLoaded", (_) => {
  const defaults = JSON.parse(localStorage.getItem("repCalc")) ?? {
    repetitions: 8,
    targetWeight: 15.0,
    buildup: [7.5, 10, 12.5],
  };

  const form = document.getElementById("reps-form");
  const submitButton = form.elements.submit;
  const repetitionsInput = form.elements.repetitions;
  const weightInput = form.elements.weight;
  const buildupInput = form.elements.buildup;
  const outputList = document.getElementById("output");

  repetitionsInput.value = defaults.repetitions;
  weightInput.value = defaults.targetWeight;
  buildupInput.value = defaults.buildup.reduce((acc, e) => `${acc}, ${e}`);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const repetitions = Number.parseInt(repetitionsInput.value);
    const weight = Number.parseInt(weightInput.value);
    const buildup = buildupInput.value
      .split(",")
      .map((s) => Number.parseInt(s.trim()));

    localStorage.setItem(
      "repCalc",
      JSON.stringify({
        repetitions: repetitions,
        targetWeight: weight,
        buildup: buildup,
      }),
    );

    const sets = calculateSets(repetitions, weight, buildup);
    while (outputList.firstChild) {
      outputList.removeChild(outputList.firstChild);
    }
    for (const set of sets) {
      const li = document.createElement("li");
      li.textContent = `${set[0]} * ${set[1]}`;
      outputList.appendChild(li);
    }
  });
});

function calculateSets(repetitions, weight, buildup) {
  const lift = repetitions * weight;
  return [weight, ...buildup]
    .map((b) => [Math.round(lift / b), b])
    .sort((l, r) => l[1] > r[1]);
}
