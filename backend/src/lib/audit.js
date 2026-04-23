import prisma from './db.js';

export async function writeAuditLog(input) {
  return prisma.auditLog.create({
    data: {
      actorUserId: input.actorUserId ?? null,
      entityType: input.entityType,
      entityId: input.entityId,
      action: input.action,
      payloadJson: input.payloadJson ?? null,
    },
  });
}
