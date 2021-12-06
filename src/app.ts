import { Router } from "express";
import Item from "./models/Item";
import Menu from "./models/Menu";
import Order from "./models/Order";
import Profile from "./models/Profile";
import User from "./models/User";

const router = Router();

const messages = {
    post: (message: string) => `El objeto ${message} ha sido creado satisfactoriamente`,
    put: (message: string) => `El objeto ${message} ha sido modificado satisfactoriamente`,
    delete: (message: string) => `El objeto ${message} fue eliminado de la base de datos satisfactoriamente`,
    error: "Hubo un error",
    foundNothing: "No hemos encontrado ningún objeto así"
}

router.get("/", (req, res) => {
    res.json({ message: "hello"})
});

router.get("/item", async ({query}, res) => {
    const items = await Item.find(query);
    res.json(items)
});

router.post("/item", async (req, res) => {
    try {        
        const newItem = new Item(req.body);
        await newItem.save();
        res.json({
            newItem, message: messages.post(newItem._id)
        })
    } catch (error) {
        res.json(error)
    }
});

router.put("/item", async ({body}, res) => {
    const itemToUpdate = await Item.findByIdAndUpdate(body.id, body);
    res.json({
        itemToUpdate,
        message: messages.put(itemToUpdate?._id)
    })
});

router.delete("/item", async ({body}, res) => {
    await Item.findByIdAndDelete(body.id);
    res.json({message: messages.delete(body.id)})
});

router.get("/menu", async ({query}, res) => {
    const menus = await Menu.find({
        items: {
            $elemMatch: {
                ...query
            }
        }
    });
    res.json(menus)
});

router.post("/menu", async({body}, res) => {
    const newMenu = new Menu({
        items: body
    })
    await newMenu.save();
    res.json({
        message: messages.post(newMenu._id),
        newMenu
    })
});

router.put("/menu", async ({body}, res) => {
    const menuToUpdate = await Menu.findById(body.id);
    if(menuToUpdate){
        menuToUpdate.items = body.items
        await menuToUpdate.save();
        res.json({
            message: messages.put(menuToUpdate?._id),
            menuToUpdate
        })
        return;
    }
    res.json(messages.foundNothing)
});

router.delete("/menu", async ({body}, res) => {
    await Menu.findByIdAndDelete(body.id);    
    const menus = await Menu.find();
    res.json({message: messages.delete(body.id), menus})
})

router.get("/profile", async ({query}, res) => {
    const profiles = await Profile.find(query);
    res.json(profiles)
});

router.post("/profile", async ({body}, res) => {
    const newProfile = new Profile(body);
    await newProfile.save();
    res.json({
        message: messages.post(newProfile._id),
        newProfile
    });
})

router.put("/profile", async ({body}, res) => {
    const profileToUpdate = await Profile.findByIdAndUpdate(body.id, body);
    res.json({message: messages.put(profileToUpdate?._id), profileToUpdate})
})

router.delete("/profile", async ({body}, res) => {
    await Profile.findByIdAndDelete(body.id);
    const profiles = await Profile.find()
    res.json({
        message: messages.delete(body.id), 
        profiles
    })
})

router.get("/user", async ({query}, res) => {
    const users = await User.find(query);
    res.json(users)
})

router.get("/user-pin", async ({query}, res) => {
    const user = await User.findOne(query);
    res.json(user);
})

router.post("/user", async ({body}, res) => {
    const newUser = new User(body);
    await newUser.save();
    res.json({
        message: messages.post(newUser._id),
        newUser
    })
})

router.put("/user", async ({body}, res) => {
    const userToUpdate = await User.findByIdAndUpdate(body.id, body);
    res.json({
        message: messages.put(body.id),
        userToUpdate
    })
})

router.delete("/user", async ({body}, res) => {
    await User.findByIdAndDelete(body.id)
    const users = await User.find();
    res.json({
        message: messages.delete(body.id),
        users
    })
})

router.route("/order")
    .get(async ({query}, res)=> {
        const orders = await Order.find(query);
        res.json(orders)
    })
    .post(async ({body}, res) => {
        const newOrder = new Order(body);
        await newOrder.save();
        res.json({
            message: messages.post(newOrder._id),
            newOrder
        })
    })
    .put(async ({body,query}, res) => {
        // buscar en base al query y modificar en base al body
        const orderToUpdate = await Order.findByIdAndUpdate(query.id, body);
        res.json({
            message: messages.put(query.id as string),
            orderToUpdate
        })
    })
    .delete(async ({query}, res) => {
        await Order.findByIdAndDelete(query.id)
        const orders = await Order.find()
        res.json({
            message: messages.delete(query.id as string),
            orders
        })
    });
    
export default router;