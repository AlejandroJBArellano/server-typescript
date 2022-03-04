import { Router } from "express";
import CorteDeCaja from "./models/CorteDeCaja";
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

router.route("/item")
    .get(async ({query}, res) => {
        const items = await Item.find(query);
        res.json(items)
    })
    .post(async (req, res) => {
        try {        
            const newItem = new Item(req.body);
            await newItem.save();
            res.json({
                newItem, message: messages.post(newItem._id)
            })
        } catch (error) {
            res.json(error)
        }
    })
    .put(async ({body}, res) => {
        const itemToUpdate = await Item.findByIdAndUpdate(body._id, body);
        res.json({
            itemToUpdate,
            message: messages.put(itemToUpdate?._id)
        })
    })
    .delete(async ({query}, res) => {
        await Item.findByIdAndDelete(query.id);
        res.json({message: messages.delete(query.id as string)})
    });

router.route("/menu")
    .get(async ({query}, res) => {
        if(query._id){
            const menu = await Menu.findById(query._id)
            res.json(menu);
            return;
        }
        const menus = await Menu.find({
            items: {
                $elemMatch: {
                    ...query
                }
            }
        });
        res.json(menus)
    })
    .post(async({body}, res) => {
        const newMenu = new Menu({
            items: body
        })

        // ! Why?
        for(const item of body) {
            const itemTOFind = await Item.findById(item._id);
            if(!itemTOFind){
                const newItem = new Item(item);
                await newItem.save();
                console.log(newItem);
                return;
            }
        }
        await newMenu.save();
        res.json({
            message: messages.post(newMenu._id),
            newMenu
        })
    })
    .put(async ({query, body}, res) => {
        const menuToUpdate = await Menu.findById(query.id);
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
    })
    .delete(async ({body}, res) => {
        await Menu.findByIdAndDelete(body.id);    
        const menus = await Menu.find();
        res.json({message: messages.delete(body.id), menus})
    });


router.route("/profile")
    .get(async ({query}, res) => {
        const profiles = await Profile.find(query);
        const profilesResponse = []
        for (const profile of profiles) {
            const menu = await Menu.findById(profile.menuId);
            profilesResponse.push({
                _id: profile._id,
                profileName: profile.profileName,
                menu
            })
        }
        res.json(profilesResponse)
    })
    .post(async ({body}, res) => {
        const menu = await Menu.findById(body.menuId);
        if(!menu || body.profileName.length < 0){
            res.json({
                messages: messages.foundNothing
            })
            return;
        }
        const newProfile = new Profile(body);
        await newProfile.save();
        res.json({
            message: messages.post(newProfile._id),
            newProfile,
            menu
        });
    })
    .put(async ({query, body}, res) => {
        const profileToUpdate = await Profile.findByIdAndUpdate(query._id, body);
        res.json({message: messages.put(profileToUpdate?._id), profileToUpdate})
    })
    .delete(async ({query}, res) => {
        await Profile.findByIdAndDelete(query._id);
        const profiles = await Profile.find();
        res.json({
            message: messages.delete(query._id as string), 
            profiles
        })
    });


router.route("/user")
    .get(async ({query}, res) => {
        const users = await User.find(query);
        res.json(users)
    })
    .post(async ({body}, res) => {
        const newUser = new User(body);
        await newUser.save();
        res.json({
            message: messages.post(newUser._id),
            newUser
        })
    })
    .put(async ({query,body}, res) => {
        const userToUpdate = await User.findByIdAndUpdate(query.id, body);
        res.json({
            message: messages.put(body.id),
            userToUpdate
        })
    })
    .delete(async ({query}, res) => {
        await User.findByIdAndDelete(query.id);
        res.json({
            message: messages.delete(query.id as string),
        })
    });


router.get("/user-pin", async ({query}, res) => {
    // TODO return all of the embeded object
    const user = await User.findOne(query);
    const profile = await Profile.findOne({profileName: user.profileName})
    const menu = await Menu.findById(profile?.menuId)
    const userResponse = {
        ...user._doc,
        profile,
        menu
    }
    delete userResponse.profile.menuId
    delete userResponse.profileName
    res.json(userResponse);
})

router.route("/order")
    .get(async ({query}, res) => {
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
    });

async function calculoDeCorte(terminal: string) {
    let ultimoCorteDeCaja = await CorteDeCaja.findOne({terminal}, {}, {sort: {"createdAt": -1}});
    let fechaUltima = new Date(ultimoCorteDeCaja ? ultimoCorteDeCaja.createdAt as string : 0)
    console.log('fechaUltima',fechaUltima)
    const VentasToQuery = await Order.find({
        paymentType: "Efectivo",
        terminal,
        createdAt: {
            $gte: fechaUltima,
            $lte: new Date()
        }
    })
    console.log('VentasToQuery', VentasToQuery)
    let ventasEfectivo = 0
    for (const order of VentasToQuery) {
        let totalToPay = 0
        for (const item of order.items) {
            totalToPay += item.price
        }
        ventasEfectivo += totalToPay
    }
    return {
        message: `El efectivo esperado es ${ultimoCorteDeCaja?.saldoRealEfectivo as number + ventasEfectivo as number}`,
        ventasConsideradas: VentasToQuery,
        ventasEfectivo,
        ultimoCorteDeCaja
    }
}

// regrese el resumen de total to pay
router.get("/calculo-de-corte", async ({query}, res) => {
    console.log(query)
    const calculo = await calculoDeCorte(query.terminal as string);
    res.json(calculo)
})

router.route("/corte-de-caja")
    .get(async ({query}, res) => {
        const cortes = await CorteDeCaja.find(query);
        res.json(cortes)
    })
    .post(async ({body}, res) => {
        const newCorte = new CorteDeCaja();
        const calculo  = await calculoDeCorte(body.terminal)
        newCorte.ventasEfectivo = calculo.ventasEfectivo;
        newCorte.saldoRealEfectivo = body.saldoRealEfectivo 
        newCorte.saldoInicialEfectivo = calculo.ultimoCorteDeCaja ? calculo.ultimoCorteDeCaja.saldoFinalEfectivo as number : 0
        newCorte.saldoEsperadoEfectivo = newCorte.saldoInicialEfectivo + newCorte.ventasEfectivo
        newCorte.faltanteOSobrante = newCorte.saldoRealEfectivo - newCorte.saldoEsperadoEfectivo
        newCorte.retiroOAbonoEfectivo = body.retiroOAbonoEfectivo
        newCorte.saldoFinalEfectivo = newCorte.saldoRealEfectivo + body.retiroOAbonoEfectivo
        newCorte.ordenesEfectivo = calculo.ventasConsideradas
        newCorte.user = body.user;
        newCorte.terminal = body.terminal;
        await newCorte.save();
        console.log(newCorte)
        res.json({
            message: messages.post,
            newCorte
        })
    })
    .put(async ({query}, res) => {

    });

export default router;