import {Router} from "express"
import * as accountController from "../controllers/account.controller";

const router = Router();

router.post("/", accountController.createAccount);
router.get("/:id", accountController.getAccount);
router.post("/deposit", accountController.deposit);
router.post("/withdraw", accountController.withdraw);
router.post("/transfer", accountController.transfer);
router.get("/:id/transactions", accountController.getTransaction);

export default router; 