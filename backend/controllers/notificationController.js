import Notifications from "../models/notificationModel.js";

export const getNotif = async (req, res) => {
    try {
        const userId = req.user._id

        const notifications = await Notifications.find({ to: userId }).populate({
            path: 'from',
            select: 'username profileImg'
        })
        await Notifications.updateMany({ to: userId }, { read: true })
        res.status(200).json(notifications)
    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}

export const deleteNotif = async (req, res) => {
    try {
        const userId = req.user._id
        await Notifications.deleteMany({ to: userId })
        res.status(200).json({ message: 'Notifications deleted' })

    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}

export const deleteOneNotif = async (req, res) => {
    try {
        const notifId = req.params.id
        const userId = req.user._id
        const notif = await Notifications.findById(notifId)
        if (!notif) {
            return res.status(404).json({ error: 'notification not found' })
        }

        if (notif.to.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'you are not allowed to delete this notification' })
        }

        await Notifications.findByIdAndDelete(notifId)
        res.status(200).json({message:'notification deleted'})


    } catch (error) {
        res.status(500).json({ error: "internal servere error" });

    }
}