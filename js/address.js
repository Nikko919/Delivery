$(".input-addres").suggestions({
  token: "5baca3dd560117a1d8090244757eabc4a52cb10b",
  type: "ADDRESS",
  constraints: {
    locations: [
      { city: "Москва" },
      { region: "Московская" }
    ]
  },
  from_bound: "settlement", // включаем все населённые пункты + СНТ
  to_bound: "house",        // до номера дома
  restrict_value: false,    // разрешает показывать вложенные объекты вроде СНТ
  onSelect: function (suggestion) {
    console.log("✅ Адрес:", suggestion.value);
    console.log("📦 Данные:", suggestion.data);
  }
});