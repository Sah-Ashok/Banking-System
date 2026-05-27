import type {Request , Response} from "express";
import * as accountService from "../service/account.service.js";


export const createAccount  = async (req: Request , res: Response): Promise<void> => {
try{
	const account = await accountService.createAccount(req.body);
	res.status(201).json({success: true , data: account});
}catch(error: unknown){
	if(error instanceof Error) {
		res.status(400).json({success: false , message: error.message});
}
}
};

export const getAccount = async (req: Request , res: Response): Promise<void> => {
	try{
		const { id } = req.params;
		if(typeof id !== "string") {
			res.status(400).json({success: false , message: "Account id is required"});
			return;
		}

		const account = await accountService.getAccountById(id);
		if(!account) {
			res.status(404).json({success: false , message: "Account not found"});
			return ; 
		}
		res.status(200).json({success: true , data: account});
	} catch(error: unknown){
		if(error  instanceof Error) {
			res.status(400).json({success: false , message: error.message});
		}
	}
};

export const deposit = async (req: Request , res: Response): Promise<void> => {
	try{
		const account = await accountService.deposite(req.body);
		res.status(200).json({success: true , data: account});
	}catch (error){
		if(error instanceof Error){
			res.status(400).json({success: false , message: error.message});
		}
	}
};

export const withdraw = async(req: Request , res: Response): Promise<void> => {
	try{
		const account = await accountService.withdraw(req.body);
		res.status(200).json({success: true , data: account});
	} catch (error: unknown) {
		if(error instanceof Error){
			res.status(400).json({success: false, message: error.message});
		}
	}
};

export const transfer = async(req: Request , res: Response): Promise<void> => {
	try{
		await accountService.transfer(req.body);
		res.status(200).json({success: true , message: "Transfer successful"});
	} catch (error : unknown) {
		if(error instanceof Error) {
			res.status(400).json({success: false , message: error.message});
		}
	}
};



export const getTransaction = async (req: Request , res: Response): Promise<void> => {
	try{
		const { id } = req.params;
		if(typeof id !== "string") {
			res.status(400).json({success: false , message: "Account id is required"});
			return;
		}

		const transaction = await accountService.getTransactions(id);
		res.status(200).json({ success: true , data: transaction });
	}catch (error: unknown) {
		if(error instanceof Error) {
			res.status(400).json({success: false , message: error.message});
		}
	}
};

