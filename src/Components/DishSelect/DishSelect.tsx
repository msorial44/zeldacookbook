import React, { useEffect } from 'react';
import { useState } from 'react';
import recipes from '../../data/fffood.json';
import type { Mats } from '../MaterialSelect/MaterialSelect';
import StatDisplay from '../StatDisplay/StatDisplay';
import './DishSelect.scss';

export type Recipe = typeof recipes[0];   

let undefRecipe: Recipe = {
    "FIELD1": 0,
    "Icon": "",
   "ActorName": "",
   "Euen name": "",
   "Recipe n°": 0,
   "Recipe": "",
   "BonusHeart": 0,
   "BonusLevel": 0,
   "BonusTime": 0,
   "ReqIngredients": 0,
   "priority": 0
}

function DishSelect(props: any) {
    const [Dish, setDish] = useState<Recipe>(undefRecipe);
    const [Effect, setEffect] = useState<string>("");
    const [EffectVal, setEffectVal] = useState<string>("");
    useEffect(() => {
        findRecipe(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    useEffect(() => {
        const newData: Mats[] = props.data.filter(function(item: Mats, pos: number, self: Mats[]) {
            return self.indexOf(item) === pos;
        });
        findEffect(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Dish, props.data]);


    function findRecipe(data: Mats[]) {
        if (data.length === 0) {
            setDish(undefRecipe);
            setEffect("");
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
                setEffect("");
            }
        } else { 
            findFood(newData);
        }
    }

    function findFood(data: Mats[]) { //ignore monster extract
        let Ing: string[][] = [];
        for (const item of data) {
            let x = [item["Name"], item["Cooking Tag 1"].trim()];
            Ing.push(x);
        }
        let localRecipes: Recipe[] = recipes;
        const singleRecipeCheck: Mats[] = data.filter(function(item: Mats, pos: number, self: Mats[]) {
            return self.indexOf(item) === pos;
        });
        const singleRecipesList = ["Hylian Tomato", "Spicy Pepper", "Stambulb", "Courser Bee Honey"];
        if (singleRecipeCheck.length !== 1) {   
            localRecipes = localRecipes.filter((recipe: Recipe) => recipe['priority'] !== 999);
        } else if (singleRecipesList.includes(singleRecipeCheck[0]["Name"])) {
            localRecipes = localRecipes.filter((recipe: Recipe) => recipe['priority'] === 999);
        }
        let finalRecipes: Recipe[] = [];

        localRecipes.forEach((recipe: Recipe) => {
            console.log("-------------------");
            let localRecipe = recipeCleanup(recipe);
            let localIng = Ing;
            for (let i = localIng.length -1; i >= 0; i--) {
                loop2:
                    for (let j = 0; j < localRecipe.length; j++) {
                        if (Array.isArray(localRecipe[j])) {
                            let temp = localRecipe[j];
                            for (let k = temp.length-1; k >= 0; k--) {
                                if (localIng[i].includes(temp[k])) {
                                    localRecipe.splice(j, 1);
                                    j--;
                                    break loop2;
                                }
                            }
                        } else {
                            if (localIng[i].includes(localRecipe[j])) {
                                localRecipe.splice(j, 1);
                                j--;
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
        console.log(finalRecipes)
        finalRecipes.sort((a, b) => {
            return a["priority"] - b["priority"];
        });
        console.log(finalRecipes);
        if (finalRecipes.length === 0) {
            let x: any = recipes.find((x: Recipe) => x["Euen name"] === "Dubious Food");
            if ((x !== undefined) && (x !== null)) { //Null Guard
                finalRecipe = x;
            }
        } else {
            let names = finalRecipes.map((x: Recipe) => x["Euen name"]);
            let elixir_count = 0;
            names.forEach((name: string) => {
                if (name.includes("Elixir")) {
                    elixir_count++;
                }
            });
            console.log(elixir_count)
            if (elixir_count > 1) {
                let x: any = recipes.find((x: Recipe) => x["Euen name"] === "Dubious Food");
                if ((x !== undefined) && (x !== null)) { //Null Guard
                    finalRecipe = x;
                }
            } else {
                let x: any = finalRecipes[0];
                if ((x !== undefined) && (x !== null)) { //Null Guard
                    finalRecipe = x;
                }
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
        if ((Dish['Euen name'] === "Fairy Tonic") || (Dish['Euen name'] === "Dubious Food")) {
            setEffect("");
            setEffectVal("None");
            return;
        }
        if (data.length === 0) {
            setEffect("");
            setEffectVal("None");
            return;
        }
        for (const item of data) {
            if (item["MaterialCategory"] === "Critter") {
                setEffect("");
                setEffectVal("None");
                return;
            }
            if (item["Cooking Effect"] !== "None") {
                effectList.push(item["Cooking Effect"]);
            }
        }
        const newEffectList = effectList.filter(function(item, pos, self) {
            return self.indexOf(item) === pos;
        });
        if (newEffectList.length !== 1) {
            setEffect("");
            setEffectVal("None");
            return;
        } else {
            let currEffect = newEffectList[0].trim();
            setEffectVal(currEffect);
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
                    setEffect("Energizing ");
                    break;
                case "StaminaUp":
                    setEffect("Enduring ");
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
            <StatDisplay effect={EffectVal} dish={Dish} data={props.data}/>
        </div>
    );

}
export default DishSelect;