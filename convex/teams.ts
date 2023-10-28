import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getTeams = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const accountId = identity.subject;

    const teams = await ctx.db
      .query("teams")
      .withIndex("by_account", (q) => q.eq("accountId", accountId))
      .order("desc")
      .collect();

    return teams;
  },
});
