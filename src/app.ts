import { Router } from "express";
import { AnyKeys } from "mongoose";
import Item from "./models/Item";
import Menu from "./models/Menu";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "hello"})
})

router.get("/item", async ({query}, res) => {
    const items = await Item.find(query);
    res.json(items)
})

router.post("/item", async (req, res) => {
    try {        
        const newItem = new Item(req.body);
        await newItem.save();
        res.json({
            newItem, message: "500"
        })
    } catch (error) {
        res.json(error)
    }
})

router.put("/item", async ({body}, res) => {
    const itemToUpdate = await Item.findByIdAndUpdate(body.id, body);
    res.json({
        itemToUpdate,
        message: "Successfully updated"
    })
})

router.delete("/item", async ({body}, res) => {
    await Item.findByIdAndDelete(body.id);
    res.json("se eliminó")
})

router.get("/menu", async({query}, res) => {
    const menus = await Menu.find(query);
    res.json(menus)
})

router.post("/menu", async({body}, res) => {
    const newMenu = new Menu(body)
    await newMenu.save();
    res.json({
        newMenu,
        message: "New Menu has been created"
    })
})

router.put("/menu", async ({body}, res) => {
    const menuToUpdate = await Menu.findByIdAndUpdate;
    res.json({
        menuToUpdate,
        message: "Successfully updated"
    })
})

router.delete("/menu", async ({body}, res) => {
    await Menu.findByIdAndDelete(body.id)
    res.json({message: `se eliminó el objeto ${body.id}`})
})
export default router