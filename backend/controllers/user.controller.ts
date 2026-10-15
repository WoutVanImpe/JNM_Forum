import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json({ message: "Ongeldig gebruiker ID" });
        return;
      }

      const user = await userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { auth0_id, name, age_group, department } = req.body;
      
      const newUser = await userService.createUser({ 
        auth0_id, 
        name, 
        age_group, 
        department, 
        onesignal_device_id: null, 
        profile_picture: null 
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message || "Kon gebruiker niet aanmaken" });
    }
  },

  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json({ message: "Ongeldig gebruiker ID" });
        return;
      }

      const updateData = req.body; 
      const updatedUser = await userService.updateUser(id, updateData);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message || "Kon gebruiker niet updaten" });
    }
  },

  searchUsersInChannel: async (req: Request, res: Response): Promise<void> => {
    try {
      const channelId = Number(req.params.channelId);
      const query = String(req.query.q || "");

      if (Number.isNaN(channelId)) {
        res.status(400).json({ message: "Ongeldig kanaal ID" });
        return;
      }

      const users = await userService.searchUsersInChannel(query, channelId);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message || "Kon gebruikers niet vinden" });
    }
  },
};