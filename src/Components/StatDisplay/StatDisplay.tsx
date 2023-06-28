import React, { useEffect } from 'react';
import { useState } from 'react';
import type { Recipe } from '../DishSelect/DishSelect';
import type { Mats } from '../MaterialSelect/MaterialSelect';
import './StatDisplay.scss';

function StatDisplay(props: any) {
    const [Effect, setEffect] = useState<string>("");
    const [Stats, setStats] = useState<any>({});

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
        //Effect Tier Level
        let tierLevel = 0;
        if (effect !== "None") {
            data.forEach((x: Mats) => {
                if (x["Cooking Effect"] == Effect) {
                    tierLevel += parseInt(x["Cooking Effect Level"]);
                }
            });
        }
        //Crit Chance
        let critChance = 0;
        data.forEach((x: Mats) => {
            if (x["Cooking Effect Time Boost Success Rate"] !== "0%") {
                critChance += parseInt(x["Cooking Effect Time Boost Success Rate"].replace("%", ""));
            }
        });
        if (critChance > 100) {
            critChance = 100;
        }
        //Effect Tier (Low, Mid, High)
        let tier = "Low";
        if (effect !== "None") {
            switch (effect) {
                case "AllSpeed":
                    if (tierLevel >= 5) {
                        tier = "Mid";
                    }
                    if (tierLevel >= 7) {
                        tier = "High";
                    }
                    break;
                case "AttackUp":
                    if (tierLevel >= 5) {
                        tier = "Mid";
                    }
                    if (tierLevel >= 7) {
                        tier = "High";
                    }
                    break;
                case "AttackUpCold":
                    break;
                case "AttackUpHot":
                    break;
                case "AttackUpThunderstorm":
                    break;
                case "DefenseUp":
                    if (tierLevel >= 5) {
                        tier = "Mid";
                    }
                    if (tierLevel >= 7) {
                        tier = "High";
                    }
                    break;
                case "FlameGuard":
                    if (tierLevel >= 7) {
                        tier = "Mid";
                    }
                    break;
                case "GloomHeal":
                    break;
                case "Glow":
                    if (tierLevel >= 5) {
                        tier = "Mid";
                    }
                    if (tierLevel >= 7) {
                        tier = "High";
                    }
                    break;
                case "LifeMaxUp":
                    break;
                case "NotSlippy":
                    break;
                case "ResistCold":
                    if (tierLevel >= 6) {
                        tier = "Mid";
                    }
                    break;
                case "ResistElectric":
                    if (tierLevel >= 4) {
                        tier = "Mid";
                    }
                    if (tierLevel >= 6) {
                        tier = "High";
                    }
                    break;
                case "ResistGloom":
                    if (tierLevel >= 2) {
                        tier = "Mid";
                    }
                    if (tierLevel >= 3) {
                        tier = "High";
                    }
                    break;
                case "ResistHot":
                    if (tierLevel >= 6) {
                        tier = "Mid";
                    }
                    break;
                case "StaminaRegen":
                    break;
                case "StaminaUp":
                    break;
                case "StealthUp":
                    if (tierLevel >= 6) {
                        tier = "Mid";
                    }
                    if (tierLevel >= 9) {
                        tier = "High";
                    }
                    break;
                case "SwimSpeedUp":
                    break;
                default:
                    break;
            }
        }
        //Effect Duration
        let duration = 0;
        const nonDurationEffect = ["LifeMaxUp", "GloomHeal", "StaminaUp", "StaminaRecharge", "None"];
        if (nonDurationEffect.includes(effect)) {
            duration = 0;
        } else {
            duration += data.length*30;
            const newData = data.filter(function(item, pos, self) {
                return self.indexOf(item) === pos;
            });
            newData.forEach((x: Mats) => {
                duration += x["Cooking Effect Time Boost Duration (Raw)"]
            });
        }
        //HP
        let hp = 0; //whole hearts
        let maxHp = 0; //quarter hearts
        if (effect === "LifeMaxUp") {
            hp = 30;
            maxHp += tierLevel;
        } else {
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
                    if (x["CookingHitPointBoost"] !== 0) {
                        hp += x["CookingHitPointBoost"];
                    }
                });
            }
            if (hp > 30) {
                hp = 30;
            }
        }
        //Stamina
        let stamina = 0; 
        let maxStamina = 0; 
        if (effect === "StaminaRegen") {
            if (tierLevel === 1) {
                stamina = 80;
            } else if (tierLevel === 2) {  
                stamina = 160;
            } else if (tierLevel === 3) {
                stamina = 280;
            } else if (tierLevel === 4) {
                stamina = 360;
            } else if (tierLevel === 5) {
                stamina = 520;
            } else if (tierLevel === 6) {
                stamina = 560;
            } else if (tierLevel === 7) {
                stamina = 640;
            } else if (tierLevel === 8) {
                stamina = 800;
            } else if (tierLevel === 9) {
                stamina = 880;
            } else if (tierLevel === 10) {
                stamina = 1000;
            } else if (tierLevel >= 11) {
                stamina = 1080;
            } else {
                stamina = 0;
            }
        } else if (effect === "StaminaUp") {
            stamina = 1080;
            if (tierLevel >= 20) {
                maxStamina = 720;
            } else if (tierLevel >= 18) {
                maxStamina = 640;
            } else if (tierLevel >= 16) {
                maxStamina = 560;
            } else if (tierLevel >= 14) {
                maxStamina = 520;
            } else if (tierLevel >= 12) {
                maxStamina = 440;
            } else if (tierLevel >= 10) {
                maxStamina = 360;
            } else if (tierLevel >= 8) {
                maxStamina = 280;
            } else if (tierLevel >= 6) {
                maxStamina = 200;
            } else if (tierLevel >= 4) {
                maxStamina = 160;
            } else if (tierLevel >= 1) {
                maxStamina = 80;
            } else {
                maxStamina = 0;
                stamina = 0;
            }
        }
        let stats = {
            "Effect": effect,
            "Effect Tier": tier,
            "Effect Tier Level": tierLevel,
            "Effect Duration": duration,
            "Crit Chance": critChance,
            "HP": hp,
            "Max HP": maxHp,
            "Stamina": stamina,
            "Max Stamina": maxStamina
        }
        setStats(stats);
    }
    
    return (
        <div className="StatDisplay">

        </div>
    );
}
export default StatDisplay;