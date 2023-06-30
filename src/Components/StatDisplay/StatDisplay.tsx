import React, { useEffect } from 'react';
import { useState } from 'react';
import type { Recipe } from '../DishSelect/DishSelect';
import type { Mats } from '../MaterialSelect/MaterialSelect';
import './StatDisplay.scss';

function StatDisplay(props: any) {
    const [Effect, setEffect] = useState<string>("None");
    const [Stats, setStats] = useState<any>({});

    useEffect(() => {
        findEffectType(props.data, props.effect, props.dish);
    }, [props.data, props.dish, props.effect]);

    useEffect(() => {
        findStats(props.data, Effect, props.dish);
    }, [props.data, Effect, props.dish, props.effect]);


    



    function findEffectType(data: Mats[], effect: string, dish: Recipe, ) {
        if (data.length === 0) {
            setEffect("None");
            return;
        }

        let matEffect = data.map((x: Mats) => {
            return x["Cooking Effect"];
        });
        matEffect = matEffect.filter((x: string) => x !== "None");
        if (matEffect.length === 0) {
            setEffect("None");
            return;
        }
        
        if (effect !== "None") {
            setEffect(effect);
            return;
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
        let tier = 1;
        if (effect !== "None") {
            switch (effect) {
                case "AllSpeed":
                    if (tierLevel >= 5) {
                        tier = 2;
                    }
                    if (tierLevel >= 7) {
                        tier = 3;
                    }
                    break;
                case "AttackUp":
                    if (tierLevel >= 5) {
                        tier = 2;
                    }
                    if (tierLevel >= 7) {
                        tier = 3;
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
                        tier = 2;
                    }
                    if (tierLevel >= 7) {
                        tier = 3;
                    }
                    break;
                case "FlameGuard":
                    if (tierLevel >= 7) {
                        tier = 2;
                    }
                    break;
                case "GloomHeal":
                    break;
                case "Glow":
                    if (tierLevel >= 5) {
                        tier = 2;
                    }
                    if (tierLevel >= 7) {
                        tier = 3;
                    }
                    break;
                case "LifeMaxUp":
                    break;
                case "NotSlippy":
                    break;
                case "ResistCold":
                    if (tierLevel >= 6) {
                        tier = 2;
                    }
                    break;
                case "ResistElectric":
                    if (tierLevel >= 4) {
                        tier = 2;
                    }
                    if (tierLevel >= 6) {
                        tier = 3;
                    }
                    break;
                case "ResistGloom":
                    if (tierLevel >= 2) {
                        tier = 2;
                    }
                    if (tierLevel >= 3) {
                        tier = 3;
                    }
                    break;
                case "ResistHot":
                    if (tierLevel >= 6) {
                        tier = 2;
                    }
                    break;
                case "StaminaRegen":
                    break;
                case "StaminaUp":
                    break;
                case "StealthUp":
                    if (tierLevel >= 6) {
                        tier = 2;
                    }
                    if (tierLevel >= 9) {
                        tier = 3;
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
        if (duration > 1800) {
            duration = 1800;
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
                    hp += parseFloat(x["Hearts Recovered"]);
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
        let stamina = 0; //fifth wheels
        let maxStamina = 0; //fifth wheels
        if (effect === "StaminaRegen") {
            if (tierLevel === 1) {
                stamina = 1;
            } else if (tierLevel === 2) {  
                stamina = 2;
            } else if (tierLevel === 3) {
                stamina = 4;
            } else if (tierLevel === 4) {
                stamina = 5;
            } else if (tierLevel === 5) {
                stamina = 7;
            } else if (tierLevel === 6) {
                stamina = 8;
            } else if (tierLevel === 7) {
                stamina = 9;
            } else if (tierLevel === 8) {
                stamina = 11;
            } else if (tierLevel === 9) {
                stamina = 12;
            } else if (tierLevel === 10) {
                stamina = 14;
            } else if (tierLevel >= 11) {
                stamina = 15;
            } else {
                stamina = 0;
            }
        } else if (effect === "StaminaUp") {
            stamina = 15;
            if (tierLevel >= 20) {
                maxStamina = 10;
            } else if (tierLevel >= 18) {
                maxStamina = 9;
            } else if (tierLevel >= 16) {
                maxStamina = 8;
            } else if (tierLevel >= 14) {
                maxStamina = 7;
            } else if (tierLevel >= 12) {
                maxStamina = 6;
            } else if (tierLevel >= 10) {
                maxStamina = 5;
            } else if (tierLevel >= 8) {
                maxStamina = 4;
            } else if (tierLevel >= 6) {
                maxStamina = 3;
            } else if (tierLevel >= 4) {
                maxStamina = 2;
            } else if (tierLevel >= 1) {
                maxStamina = 1;
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

   function hpDisplay(Stats: any) {
        if (Stats["HP"] !== 0) {
            if ((Stats["HP"] === 30) || (Stats["Effect"] === "LifeMaxUp")) {
                return (
                    <div className="HPDisplay LifeMaxUp">
                        <img src={process.env.PUBLIC_URL + "/Images/icons/Heart.svg"} alt={"Heart"}/>
                        <p>Full Recovery</p>
                    </div>
                )
            } else if (Stats["HP"] === 0.25) {
                return (
                    <div className="HPDisplay">
                        <img src={process.env.PUBLIC_URL + "/Images/icons/Heart Quarter.svg"} alt={"Heart"}/>
                    </div>
                )
            } else if (Stats["HP"] === 0.5) {
                return (
                    <div className="HPDisplay">
                        <img src={process.env.PUBLIC_URL + "/Images/icons/Heart Half.svg"} alt={"Heart"}/>
                    </div>
                )
            } else {
                return (
                    <div className="HPDisplay">
                        <img src={process.env.PUBLIC_URL + "/Images/icons/Heart.svg"} alt={"Heart"}/>
                        <p>{Stats["HP"]}</p>
                    </div>
                )
            }
        }
        return;
    }

    function effectDisplay(Stats: any) {
        const nonDurationEffect = ["LifeMaxUp", "GloomHeal", "StaminaUp", "StaminaRegen", "None"];
        if (nonDurationEffect.includes(Stats["Effect"])) {
            if (Stats["Effect"] === "LifeMaxUp") {
                return (
                    <div className="EffectDisplay LifeMaxUp">
                        <img src={process.env.PUBLIC_URL + "/Images/icons/LifeMaxUp.svg"} alt={"Heart Extra"}/>
                        <p>+{Stats["Max HP"]/4}</p>
                    </div>
                )
            } else if (Stats["Effect"] === "GloomHeal") {
                return (
                    <div className="EffectDisplay GloomHeal">
                        <img src={process.env.PUBLIC_URL + "/Images/icons/GloomHeal.svg"} alt={"GloomHeal Heart"}/>
                        <p>+{Stats["Effect Tier Level"]/4}</p>
                    </div>
                )
            } else if (Stats["Effect"] === "StaminaRegen") {
                let remaining = 1;
                remaining = Stats["Stamina"]%5;
                let full_wheels = Math.floor(Stats["Stamina"]/5);
                const wheels = function (full_wheels: number) {
                    let list = [];
                    for (let i = 0; i < full_wheels; i++) {
                        list.push(<img src={process.env.PUBLIC_URL + "/Images/icons/Stamina5.svg"} alt={"Stamina Wheel Full"}/>);
                    }
                    return list;
                }
                return (
                    <div className="EffectDisplay StaminaRegen">
                        {wheels(full_wheels)}
                        {remaining !== 0 && <img src={process.env.PUBLIC_URL + "/Images/icons/Stamina" + remaining + ".svg"} alt={"Stamina Wheel " + remaining}/>}
                    </div>
                )
            } else if (Stats["Effect"] === "StaminaUp") {
                let remaining = 1;
                remaining = Stats["Max Stamina"] % 5;
                let full_wheels = Math.floor(Stats["Max Stamina"]/5);
                const wheels = function (full_wheels: number) {
                    let list = [];
                    for (let i = 0; i < full_wheels; i++) {
                        list.push(<img src={process.env.PUBLIC_URL + "/Images/icons/StaminaUp5.svg"} alt={"Stamina Wheel Full"}/>);
                    }
                    return list;
                }
                return (
                    <div className="EffectDisplay StaminaUp">
                        {wheels(full_wheels)}
                        {remaining !== 0 && <img src={process.env.PUBLIC_URL + "/Images/icons/StaminaUp" + remaining + ".svg"} alt={"Stamina Wheel " + remaining}/>}
                    </div>
                )
            } else {
                return;
            }
        } else {
            const icons = function (tier: number) {
                let list = [];
                for (let i = 0; i < tier; i++) {
                    list.push(<img src={process.env.PUBLIC_URL + "/Images/icons/" + Stats["Effect"] + ".svg"} alt={Stats["Effect"]}/>);
                }
                return list;
            }
            if (Stats["Effect"] !== "") {
                return (
                    <div className="EffectDisplay Default">
                        {icons(Stats["Effect Tier"])}
                        <p>{effectToName(Stats["Effect"])}</p>
                        <p className='effect-duration'>{Math.floor(Stats["Effect Duration"]/60)}:{Stats["Effect Duration"]%60}{Stats["Effect Duration"]%60===0 && 0}</p>
                    </div>
                )
            }      
        }
    }

    function effectToName(effect: string) {
        switch (effect) {
            case "AllSpeed":
                return "Speed Up";
            case "AttackUp":
                return ("Attack Up");
            case "AttackUpCold":
                return ("Cold Weather Attack");
            case "AttackUpHot":
                return ("Hot Weather Attack");
            case "AttackUpThunderstorm":
                return ("Stormy Attack");
            case "DefenseUp":
                return ("Defense Up");
            case "Glow":
                return ("Glow");
            case "ResistCold":
                return ("Cold Resistance");
            case "ResistElectric":
                return ("Shock Resistance");
            case "ResistGloom":
                return ("Gloom Resistance");
            case "ResistHot":
                return ("Heat Resistance");
            case "StealthUp":
                return ("Stealth Up");
            case "SwimSpeedUp":
                return ("Swim Speed Up");
            case "NotSlippy":
                return ("Slip Resistance");
            case "FlameGuard":
                return ("Flame Guard");
            default:
                return;
        }
    }
    
    return (
        <div className="StatDisplay">
            {hpDisplay(Stats)}
            {effectDisplay(Stats)}
        </div>
    );
}
export default StatDisplay;