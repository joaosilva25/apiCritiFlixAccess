import { Response } from 'express';
import users from '../model/users';
import bcrypt from 'bcryptjs';

export const registerUser = async (res: Response, userName: string, email: string, password: string) => {
    try {
        const userExists = await users.findOne({ email: email, userName: userName });

        const hashPass = bcrypt.hashSync(password, 10);

        if (!userExists) {
            try {
                await users.create({ userName: userName, email: email, password: hashPass });
                return res.status(200).json({ message: 'OK' });
            } catch (error) {
                return res.status(500).json({ error: "Erro na criação do usuário" });
            }
        } else {
            return res.status(400).json({ message: 'Usuário já existe' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' });
    }
};

export const loginUser = async (res: Response, email: string, password: string) => {
    try {
        const userExists = await users.findOne({ email: email });

        if (userExists) {
            const paswordCompare = await bcrypt.compare(password, userExists.password);
            if (paswordCompare) {
                return res.status(200).json({ userExists, message: "OK" });
            } else {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
        } else {
            return res.status(404).json({ message: 'Usuário não registrado' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro inesperado com login' });
    }
};

export const movieDataSave = async (res: Response, email: string, movieName: string, movieImage: string, overview: string, movieGenres: string, id: string, releaseDate: string, average: number) => {
    try {
        const userExists = await users.findOne({ email: email });

        if (userExists) {
            const movieAlreadyInDB = await users.findOne({
                myList: {
                    $elemMatch: {
                        title: movieName,
                        poster: movieImage,
                        overview: overview,
                        genre: movieGenres,
                        id: id,
                        dateRelease: releaseDate,
                        average: average
                    }
                }
            });
            if (!movieAlreadyInDB) {
                await users.updateOne(
                    { email: email },
                    {
                        $push: {
                            myList: {
                                title: movieName,
                                poster: movieImage,
                                overview: overview,
                                genre: movieGenres,
                                id: id,
                                dateRelease: releaseDate,
                                average: average
                            }
                        }
                    }
                );
                return res.status(200).json({ message: 'Adicionado' });
            } else {
                return res.status(409).json({ message: "Já salvo" });
            }
        } else {
            return res.status(404).json({ message: "Erro Inesperado" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' });
    }
};

export const userShow = async (res: Response, email: string) => {
    try {
        const userExists = await users.findOne({ email: email });

        if (userExists) {
            return res.status(200).json({ userExists });
        } else {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro inesperado' });
    }
};
