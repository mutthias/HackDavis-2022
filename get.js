const searchBtn = document.getElementById("search-button");
const results = document.getElementById("results");
let food_list = [];
let nameList;
let searchInputTxt = document.getElementById("search-input").value.trim();

//  const fetch = require("node-fetch");
const params = {
  api_key: "0tB6P6ZqsoHHDxl10nJEYlVNxFStnxc95epdjeNu",
  query: "",
  dataType: ["Survey (FNDDS)"],
  pageSize: 1,
};

searchBtn.addEventListener("click", getNutrition);

function getData() {
  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
    params.query
  )}&pageSize=${encodeURIComponent(
    params.pageSize
  )}&api_key=${encodeURIComponent(params.api_key)}&dataType${encodeURIComponent(
    params.dataType
  )}`;
  return fetch(api_url).then((response) => response.json());
}

function getNutrition() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  let html = "";
  console.log("food " + food_list);
  let d1 = document.getElementById("dropbar1");
  let d1_choice = d1.value;

  console.log("test" + d1_choice);

  params.query = searchInputTxt;

  getData().then((data) => {
    if (data.foods && d1_choice != "default") {
      getData().then((data) =>
        console.log(data.foods[0].foodNutrients[d1_choice].value)
      );
    } else {
    }
    console.log(data.foods[0].foodNutrients);
    if (d1_choice == 11) {
      for (let i = 0; i < data.foods[0].foodNutrients.length; i++) {
        if (data.foods[0].foodNutrients[i].nutrientName == "Cholesterol") {
          if (data.foods[0].foodNutrients[i].value < 10) {
            html += `
            <div class="food-info">
                <p>Consuming ${searchInputTxt} is a very safe choice for high cholesterol. It has ${data.foods[0].foodNutrients[i].value}mg of cholesterol and ${data.foods[0].foodNutrients[1].value}g of trans-fat which is very low.</p>
              </div>
                `;
          } else if (
            data.foods[0].foodNutrients[i].value > 10 &&
            data.foods[0].foodNutrients[i].value < 30
          ) {
            html += `
              <div class="food-info">
                  <p>Consuming ${searchInputTxt} is a generally safe choice for high cholesterol. It has ${data.foods[0].foodNutrients[i].value}mg of cholesterol and ${data.foods[0].foodNutrients[1].value}g of trans fat which is slightly low. You should be able to eat this frequently without major repercussions for cholesterol.</p>
                </div>
                  `;
          } else if (
            data.foods[0].foodNutrients[i].value > 30 &&
            data.foods[0].foodNutrients[i].value < 60
          ) {
            html += `
                <div class="food-info">
                    <p>Consuming ${searchInputTxt} isn't the best for high cholesterol. It has ${data.foods[0].foodNutrients[i].value}mg of cholesterol and ${data.foods[0].foodNutrients[1].value}g of trans fat which is a moderate amount. You should be able to eat this, but should do so in moderation.</p>
                  </div>
                    `;
          } else if (data.foods[0].foodNutrients[i].value >= 60) {
            html += `
                  <div class="food-info">
                      <p>Consuming ${searchInputTxt} is a very poor choice for high cholesterol. It has ${data.foods[0].foodNutrients[i].value}mg of cholesterol and ${data.foods[0].foodNutrients[1].value}g of trans fat which is too high. You should stay away from this as much as possible. </p>
                    </div>
                      `;
          }
          html += `
                    <div class="food-info2">
                    <p>**Disclaimer** this generates decisions solely on cholesterol levels, but be sure to reference the level of fat and avoid foods with more than 10-15g of it as well. Results are based on the first result of branded foods on https://fdc.nal.usda.gov/</p>
                    </div>
                    `;
          break;
        }
      }
    } else if (d1_choice == 4) {
      for (let i = 0; i < data.foods[0].foodNutrients.length; i++) {
        if (
          data.foods[0].foodNutrients[i].nutrientName ==
          "Sugars, total including NLEA"
        ) {
          if (data.foods[0].foodNutrients[i].value < 10) {
            html += `
            <div class="food-info">
              <p>Consuming ${searchInputTxt} is a safe choice for diabetics. It has ${data.foods[0].foodNutrients[i].value}g of total sugars which is low.</p>
            </div>
              `;
          } else if (
            data.foods[0].foodNutrients[i].value > 10 &&
            data.foods[0].foodNutrients[i].value < 20
          ) {
            html += `
                <div class="food-info">
                <p>Consuming ${searchInputTxt} isn't the safest choice for diabetic people. It has ${data.foods[0].foodNutrients[i].value}g of total sugars which is a moderate level. If consumed, do so in moderation.</p>
                  </div>
                  `;
          } else if (data.foods[0].foodNutrients[i].value > 20) {
            html += `
              <div class="food-info">
              <p>Consuming ${searchInputTxt} needs to be avoided as much as possible. It has ${data.foods[0].foodNutrients[i].value}g of total sugars which is too much grams of sugar for a diabetic person. Try to not eat this at all.</p>
              </div>
               `;
          }
          html += `
                      <div class="food-info2">
                      <p>**Disclaimer** this generates decisions based on the recommended sugar limit for diabetics of 25g Results are based on the first result of branded foods on https://fdc.nal.usda.gov/.
                      </div>
                      `;
          break;
        }
      }
    } else if (d1_choice == 10) {
      for (let i = 0; i < data.foods[0].foodNutrients.length; i++) {
        if (data.foods[0].foodNutrients[i].nutrientName == "Protein") {
          if (data.foods[0].foodNutrients[i].value < 5) {
            html += `
                      <div class="food-info">
                        <p>Eating ${searchInputTxt} isn't a very good choice of protein. It has ${data.foods[0].foodNutrients[i].value}g of protein which is very low. Consider eating more meat!</p>
                      </div>
                        `;
          } else if (
            data.foods[0].foodNutrients[i].value > 5 &&
            data.foods[0].foodNutrients[i].value < 10
          ) {
            html += `
                          <div class="food-info">
                          <p>Eating ${searchInputTxt} is an ok choice for protein. It has ${data.foods[0].foodNutrients[i].value}g of protein which is still a bit low. Consider adding this alongside other food rather than eating this on its own.</p>
                            </div>
                            `;
          } else if (
            data.foods[0].foodNutrients[i].value > 10 &&
            data.foods[0].foodNutrients[i].value < 20
          ) {
            html += `
                        <div class="food-info">
                        <p>Eating ${searchInputTxt} is a great choice of protein. It has ${data.foods[0].foodNutrients[i].value}g of protein which is a great amount for a singular item. It's a solid choice for higher protein intake.</p>
                        </div>
                         `;
          } else if (data.foods[0].foodNutrients[i].value > 20) {
            html += `
                          <div class="food-info">
                          <p>Eating ${searchInputTxt} is an excellent choice of protein. It has ${data.foods[0].foodNutrients[i].value}g of protein which is an amazing amount of protein for a singular item. To maximize protein intake, consider consuming this item.</p>
                          </div>
                           `;
          }
          html += `
                                <div class="food-info2">
                                <p>**Disclaimer** Results are based on the first result of branded foods on https://fdc.nal.usda.gov/.
                                </div>
                                `;
          break;
        }
      }
    }
    // html += `
    // <div class="food-info2">
    //     <p>**Disclaimer** this generates decisions solely on cholesterol levels, but be sure to reference the level of fat and avoid foods with more than 10-15g of it as well.</p>
    //   </div>
    //     `
    results.innerHTML = html;
  });
}

/*
1) protein
2) total lipid (fat)
3) Carbs
4) Energy
5) Sugars
6) Fiber
7) Calcium
8) iron
9) sodium
10) vitamin A
11) Vitamin C
12) Cholesterol
13) fatty acids, total trans
14) 

*/