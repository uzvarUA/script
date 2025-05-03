# Реклама
```js
import {world, system} from "@minecraft/server";

import {ActionFormData, ActionFormResponse} from "@minecraft/server-ui";



const playerIntervals = new Map();

let intervalId;



function startTracking(player) {

    if (playerIntervals.has(player.name)) {

        return;

    }



    const intervalId = system.runInterval(() => {

        const currentPosition = player.location;



        if (player.previousPosition) {

            const previousPosition = player.previousPosition;



            if (

                currentPosition.x !== previousPosition.x ||

                currentPosition.y !== previousPosition.y ||

                currentPosition.z !== previousPosition.z

            ) {

                stopTracking(player);

            }

        }



        player.previousPosition = currentPosition;

    }, 1);



    playerIntervals.set(player.name, intervalId);

}



function stopTracking(player) {

    const intervalId = playerIntervals.get(player.name);



    if (intervalId !== undefined) {

        system.clearRun(intervalId);

        playerIntervals.delete(player.name);

        delete player.previousPosition;



        const welcomeMessage = `§fХочеш пограти на сервері з §bПВП§f?\n§fЗаходь на сервер §d§lZeqa\n§fIP: §bZeqa.net\n§fPORT: §b19132`;

        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"${welcomeMessage}"}]}`);



        let formMessage = "§fЗаходь на сервер з ПВП §d§lZeqa§r\n";

        formMessage += "§fУ нас є різних ПВП-режимами\n\n";

        formMessage += "§fЗаходь разом з Атлас Клієнтом\n\n";

        formMessage += "§fАтлас Клієнт є легальним на сервері Zeqa. Не оновлюйте Майнкрафт Бедрок Едішин. Треба чекати, щоб оновили сервер Zeqa. Це займе декілька днів!\n\n";

        formMessage += "§fIP: §bZeqa.net\n§fPORT: §b19132";



        const form = new ActionFormData()

            .title("§d§lZeqa")

            .body(formMessage)

            .button("Закрити форму");

        form.show(player);

    }

}



world.afterEvents.playerSpawn.subscribe((event) => {

    const player = event.player;

    startTracking(player);

});
```
# JSON
```js
{
    "module_name": "@minecraft/server-ui",
    "version": "2.0.0"
}
```
<br>
```js
{
    "module_name": "@minecraft/server",
    "version": "1.19.0"
}
```
