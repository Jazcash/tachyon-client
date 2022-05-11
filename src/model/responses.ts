import { Type } from "@sinclair/typebox";

export const userSchema = Type.Object({
    id: Type.Number(),
    springid: Type.Union([Type.Number(), Type.String()]), // TODO: Server will fix this
    name: Type.String(),
    bot: Type.Boolean(),
    clan_id: Type.Union([Type.Number(), Type.Null()])
});

export const myUserSchema = Type.Intersect([userSchema, Type.Object({
    friend_requests: Type.Array(Type.Number()),
    friends: Type.Array(Type.Number())
})])

export const clientSchema = Type.Object({
    ally_team_number: Type.Number(),
    away: Type.Boolean(),
    in_game: Type.Boolean(),
    lobby_id: Type.Number(),
    ready: Type.Boolean(),
    role: Type.String(),
    team_colour: Type.Number(),
    team_number: Type.Number(),
    userid: Type.Number()
});

export const botSchema = Type.Object({
    ai_dll: Type.String(),
    ally_team_number: Type.Number(),
    handicap: Type.Number(),
    name: Type.String(),
    owner_id: Type.Number(),
    owner_name: Type.String(),
    player: Type.Boolean(),
    ready: Type.Boolean(),
    side: Type.Number(),
    sync: Type.Number(),
    team_colour: Type.String(),
    team_number: Type.Number(),
});

export const responses = {
    "s.auth.disconnect": Type.Object({}), // this doesn't actually exist but keeping it here to simplify typings
    "s.system.pong": Type.Object({}),
    "s.auth.register": Type.Object({
        result: Type.String(),
        reason: Type.Optional(Type.String()),
    }),
    "s.auth.get_token": Type.Object({
        result: Type.String(),
        token: Type.Optional(Type.String()),
        reason: Type.Optional(Type.String())
    }),
    "s.auth.login": Type.Object({
        result: Type.String(),
        agreement: Type.Optional(Type.String()),
        reason: Type.Optional(Type.String()),
        user: Type.Optional(myUserSchema),
    }),
    "s.auth.verify": Type.Object({
        result: Type.String(),
        user: Type.Optional(myUserSchema),
        reason: Type.Optional(Type.String())
    }),
    "s.lobby.query": Type.Object({
        lobbies: Type.Array(Type.Object({
            bots: Type.Record(Type.String(), botSchema),
            disabled_units: Type.Array(Type.String()),
            engine_name: Type.String(),
            engine_version: Type.String(),
            founder_id: Type.Number(),
            id: Type.Number(),
            ip: Type.String(),
            locked: Type.Boolean(),
            map_hash: Type.String(),
            map_name: Type.String(),
            max_players: Type.Number(),
            name: Type.String(),
            password: Type.Union([Type.String(), Type.Null()]),
            players: Type.Array(Type.Number()),
            tags: Type.Record(Type.String(), Type.String()),
            type: Type.String(),
        }))
    }),
    "s.user.user_and_client_list": Type.Object({
        clients: Type.Array(clientSchema),
        users: Type.Array(userSchema),
    })
} as const;