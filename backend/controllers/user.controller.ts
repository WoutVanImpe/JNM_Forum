import type { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Kon gebruikers niet ophalen" });
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email } = req.body;
      const newUser = await userService.createUser({ name, email });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: "Kon gebruiker niet aanmaken" });
    }
  },
};