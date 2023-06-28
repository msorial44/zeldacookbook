import React, { useEffect } from 'react';
import { useState } from 'react';
import recipes from '../../data/fffood.json';
import type { Mats } from '../../App';
import './DishSelect.scss';

export type Recipe = typeof recipes[0];   

let undefRecipe: Recipe = {
    "Icon": "",
   "ActorName": "",
   "Euen name": "",
   "Recipe n°": 0,
   "Recipe": "",
   "BonusHeart": 0,
   "BonusLevel": 0,
   "BonusTime": 0,
   "ReqIngredients": 0
}

function DishSelect(props: any) {
    const [Dish, setDish] = useState<Recipe>(undefRecipe);
    const [Effect, setEffect] = useState<string>("");
    useEffect(() => {
        findRecipe(props.data);
    }, [props.data]);


   function findRecipe(data: Mats[]) {
        if (data.length === 0) {
            return;
        }
        const newData = data.filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        });

        const MatCat = newData.map((x: Mats) => x.MaterialCategory);
        
        if ((MatCat.includes("Enemy") && !MatCat.includes("Critter")) || (MatCat.includes("Critter") && !MatCat.includes("Enemy"))) {
            let x: any = recipes.find((x: Recipe) => x["Euen name"] === "Dubious Food");
            if ((x !== undefined) && (x !== null)) { //Null Guard
                setDish(x);
            }
        } else { 
            findFood(newData);
        }
        findEffect(newData);
    }

    function findFood(data: Mats[]) { //ignore monster extract
        let Ing: string[][] = [];
        for (const item of data) {
            let x = [item["Name"], item["Cooking Tag 1"].trim()];
            Ing.push(x);
        }

        const localRecipes: Recipe[] = recipes;
        console.log(localRecipes);
        let finalRecipes: Recipe[] = [];

        localRecipes.forEach((recipe: Recipe) => {
            let localRecipe = recipeCleanup(recipe);
            let localIng = Ing;
            for (let i = localRecipe.length - 1; i >= 0; i--) {
                if (Array.isArray(localRecipe[i])) {
                    let temp = localRecipe[i];
                    loop2:
                        for (let j = 0; j < temp.length; j++) {
                            for (let k = 0; k < localIng.length; k++) {
                                if (localIng[k].includes(temp[j])) {
                                    localIng = localIng.filter(x => !x.includes(temp[j]));
                                    localRecipe.splice(i, 1);
                                    break loop2;
                                }
                            }
                        }
                } else {
                    for (let j = localIng.length-1; j >= 0; j--) {
                        if (localIng[j].includes(localRecipe[i])) {
                            // eslint-disable-next-line no-loop-func
                            localIng = localIng.filter(x => !x.includes(localRecipe[i]));
                            localRecipe.splice(i, 1);
                            break;
                        } 
                    }
                }
            }
            if (localRecipe.length === 0) {
                finalRecipes.push(recipe);
            }
        });
        let finalRecipe: Recipe = undefRecipe;
        console.log(finalRecipes);
        if (finalRecipes.length === 0) {
            let x: any = recipes.find((x: Recipe) => x["Euen name"] === "Dubious Food");
            if ((x !== undefined) && (x !== null)) { //Null Guard
                finalRecipe = x;
            }
        } else {
            let max = 0;
            for (let i = 0; i < finalRecipes.length; i++) {
                if (recipeCleanup(finalRecipes[i]).length > max) {
                    max = recipeCleanup(finalRecipes[i]).length;
                }
            }
            finalRecipes = finalRecipes.filter(x => recipeCleanup(x).length === max);
            console.log(finalRecipes);
            let x: any = finalRecipes[0];
            if ((x !== undefined) && (x !== null)) { //Null Guard
                finalRecipe = x;
            }
        }
        setDish(finalRecipe);
    }
    
    function recipeCleanup(data: Recipe): any {
        let finalList: (string[]|string)[] = [];
        data["Recipe"] = data["Recipe"].replaceAll('"', '');
            let recipeNames = data["Recipe"].split("&&");
            recipeNames = recipeNames.map(x => x.trim());
            recipeNames.forEach((rec: string) => {
                if (rec.includes("(")) {
                    rec = rec.replace("(", "");
                    rec = rec.replace(")", "");
                    let recList = rec.split("||");
                    recList = recList.map(x => x.trim());
                    finalList.push(recList);
                } else {
                    finalList.push(rec);
                }
            });
        return finalList;
    }

    function findEffect(data: Mats[]) {
        let effectList: string[] = [];
        data.forEach((item: Mats) => {
            if (item["Cooking Effect"] !== "None" && item["MaterialCategory"] !== "Critter") {
                effectList.push(item["Cooking Effect"]);
            }
        });
        const newEffectList = effectList.filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        });
        if (newEffectList.length > 1 || newEffectList.length === 0) {
            setEffect("");
            return;
        } else {
            let currEffect = newEffectList[0].trim();
            switch (currEffect) {
                case "AllSpeed":
                    setEffect("Hasty ");
                    break;
                case "AttackUp":
                    setEffect("Mighty ");
                    break;
                case "AttackUpCold":
                    setEffect("Biting ");
                    break;
                case "AttackUpHot":
                    setEffect("Scorching ");
                    break;
                case "AttackUpThunderstorm":
                    setEffect("Stormy ");
                    break;
                case "DefenseUp":
                    setEffect("Tough ");
                    break;
                case "GloomHeal":
                    setEffect("Sunny ");
                    break;
                case "Glow":
                    setEffect("Bright ");
                    break;
                case "LifeMaxUp":
                    setEffect("Hearty ");
                    break;
                case "ResistCold":
                    setEffect("Spicy ");
                    break;
                case "ResistElectric":
                    setEffect("Electro ");
                    break;
                case "ResistGloom":
                    setEffect("Warding ");
                    break;
                case "ResistHot":
                    setEffect("Chilly ");
                    break;
                case "StaminaRegen":
                    setEffect("Enduring ");
                    break;
                case "StaminaUp":
                    setEffect("Energizing ");
                    break;
                case "StealthUp":
                    setEffect("Sneaky ");
                    break;
                case "SwimSpeedUp":
                    setEffect("Rapid ");
                    break;
                default:
                    setEffect("");
            }


        }
        
    }


    return (
        <div className="DishSelect">
            <img src={Dish.Icon} alt={Dish["Euen name"]}/>
            <div className='Dish-Text'>{Effect + Dish['Euen name']}</div>
        </div>
    );

}
export default DishSelect;