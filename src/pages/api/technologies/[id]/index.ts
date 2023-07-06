import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { technologyValidationSchema } from 'validationSchema/technologies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.technology
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTechnologyById();
    case 'PUT':
      return updateTechnologyById();
    case 'DELETE':
      return deleteTechnologyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTechnologyById() {
    const data = await prisma.technology.findFirst(convertQueryToPrismaUtil(req.query, 'technology'));
    return res.status(200).json(data);
  }

  async function updateTechnologyById() {
    await technologyValidationSchema.validate(req.body);
    const data = await prisma.technology.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTechnologyById() {
    const data = await prisma.technology.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
