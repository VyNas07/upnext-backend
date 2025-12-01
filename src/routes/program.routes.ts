import { Router } from 'express';
import { ProgramController } from '../controllers/ProgramController';

const router = Router();
const controller = new ProgramController();

// GET /api/programs - Listar todos os programas
router.get('/', (req, res) => controller.getAll(req, res));

// GET /api/programs/:id - Buscar programa por ID
router.get('/:id', (req, res) => controller.getById(req, res));

// POST /api/programs - Criar novo programa
router.post('/', (req, res) => controller.create(req, res));

// PUT /api/programs/:id - Atualizar programa
router.put('/:id', (req, res) => controller.update(req, res));

// DELETE /api/programs/:id - Deletar programa
router.delete('/:id', (req, res) => controller.delete(req, res));

// GET /api/programs/institution/:institutionId - Buscar por institui??o
router.get('/institution/:institutionId', (req, res) => controller.getByInstitution(req, res));

export default router;
