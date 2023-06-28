import React, { useEffect } from 'react';
import { useState } from 'react';
import type { Recipe } from '../DishSelect/DishSelect';
import type { Mats } from '../../App';
import './StatDisplay.scss';

function StatDisplay(props: any) {
    const [Effect, setEffect] = useState<string>("");

    useEffect(() => {
        findEffectType(props.data, props.effect, props.dish);
        findStats(props.data, Effect, props.dish);
    }, [props.data]);

    function findEffectType(data: Mats[], effect: string, dish: Recipe, ) {
        if (effect !== "None") {
            setEffect(effect);
        } else if (dish["Euen name"].includes("Elixir")) {
            let effectName = dish["Euen name"].split(" ")[0];
            switch (effectName) {
                case "Energizing":
                    setEffect("StaminaRegen");
                    break;
                case "Hasty":
                    setEffect("AllSpeed");
                    break;
                case "Spicy":
                    setEffect("ResistCold");
                    break;
                case "Chilly":
                    setEffect("ResistHot");
                    break;
                case "Electro":
                    setEffect("ResistElectric");
                    break;
                case "Fireproof":
                    setEffect("FlameGuard");
                    break;
                case "Mighty":
                    setEffect("AttackUo");
                    break;
                case "Tough":
                    setEffect("DefenseUp");
                    break;
                case "Sneaky":
                    setEffect("StealthUp");
                    break;
                case "Sticky":
                    setEffect("NotSlippy");
                    break;
                case "Bright":
                    setEffect("Glow");
                    break;
                case "Enduring":
                    setEffect("StaminaUp");
                    break;
                case "Hearty":
                    setEffect("LifeMaxUp");
                    break;
                default:
                    setEffect("None");
                    break;
            }
        } else {
            setEffect("None");
        }
    }

    function findStats(data: Mats[], effect: string, dish: Recipe) {
        //HP
        let hp = 0;
        data.forEach((x: Mats) => {
            if (x["Hearts Recovered"] !== "-") {
                hp += parseInt(x["Hearts Recovered"]);
            }
        });
        hp *= 2;
        if (dish["BonusHeart"] !== 0) {
            hp += dish["BonusHeart"];
        }
        if (data.length > 1) {
            data.forEach((x: Mats) => {
                if (x["CookingHitPointBoost"] !== "0") {
                    hp += parseInt(x["CookingHitPointBoost"]);
                }
            });
        }
        if (hp > 30) {
            hp = 30;
        }
        //Effect Tier
        let tierLevel = 0;
        if (effect !== "None") {
            data.forEach((x: Mats) => {
                if (x["Cooking Effect"] == Effect) {
                    tierLevel += parseInt(x["Cooking Effect Level"]);
                }
            });
        }
    }
    
    return (
        <div className="StatDisplay">

        </div>
    );
}
export default StatDisplay;