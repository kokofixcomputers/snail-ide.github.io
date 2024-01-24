const shuffle = list => {
    for (let i = list.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        const tmp = list[i];
        list[i] = list[random];
        list[random] = tmp;
    }
    return list;
};

const fromHardcoded = ({ userId, username, name }) => ({
    image: `https://trampoline.turbowarp.org/avatars/${userId}`,
    href: `https://scratch.mit.edu/users/${username}/`,
    text: name || username
});

const fromHardcodedGithub = username => ({
    image: `https://github.com/${username}.png`,
    href: `https://github.com/${username}/`,
    text: username
});
const fromHardcodedNamed = username => ({
    image: `https://penguinmod.com/unknown_user.png`,
    href: "https://studio.penguinmod.com/credits.html#",
    text: username
});

const fromHardcodedDiscord = async userId => {
    const res = await fetch(`https://pmupdatereader.jeremygamer13.repl.co/user/${userId}`);
    const json = await res.json();
    return {
        image: json.avatarURL,
        text: json.username
    };
};

const addonDevelopers = [
    {
        userId: '34018398',
        username: 'Jeffalo'
    },
    {
        userId: '64184234',
        username: 'ErrorGamer2000'
    },
    {
        userId: '41616512',
        username: 'pufferfish101007'
    },
    {
        userId: '61409215',
        username: 'TheColaber'
    },
    {
        userId: '1882674',
        username: 'griffpatch'
    },
    {
        userId: '10817178',
        username: 'apple502j'
    },
    {
        userId: '16947341',
        username: '--Explosion--'
    },
    {
        userId: '14880401',
        username: 'Sheep_maker'
    },
    {
        userId: '9981676',
        username: 'NitroCipher'
    },
    {
        userId: '2561680',
        username: 'lisa_wolfgang'
    },
    {
        userId: '60000111',
        username: 'GDUcrash'
    },
    {
        userId: '4648559',
        username: 'World_Languages'
    },
    {
        userId: '17340565',
        username: 'GarboMuffin'
    },
    {
        userId: '5354974',
        username: 'Chrome_Cat'
    },
    {
        // actual ID is 34455896 but their avatar is the wrong resolution and looks really weird
        userId: '0',
        username: 'summerscar'
    },
    {
        userId: '55742784',
        username: 'RedGuy7'
    },
    {
        userId: '9636514',
        username: 'Tacodiva7729'
    },
    {
        userId: '14792872',
        username: '_nix'
    },
    {
        userId: '30323614',
        username: 'BarelySmooth'
    },
    {
        userId: '64691048',
        username: 'CST1229'
    }
].map(fromHardcoded);

const pmDevelopers = [
    'enderhacker',
    'FreshPenguin112',
    'Ianyourgod',
    'JoshAtticus',
    'JeremyGamer13',
    'jwklong',
    'tnix100',
    'RedMan13',
    'showierdata9978',
    'nmsderp',
    'cesderp14',
    'thepython555'
].map(fromHardcodedGithub);

const pmPullRequestDevelopers = [
    'NexusKitten',
    'LilyMakesThings',
    'MikeDev101',
    'kokofixcomputers',
    'PPPDUD',
    'qbjl',
    'minidogg'
    // add more people probably
].map(fromHardcodedGithub);

const pmApiDevelopers = [
    'JeremyGamer13',
    'RedMan13',
    'tnix100',
    'Ianyourgod',
    'JoshAtticus',
    'enderhacker'
].map(fromHardcodedGithub);

// todo: should translators be only named or...?
const pmTranslators = [
    {
        text: 'kolikiscool',
        image: `https://github.com/kolikiscool.png`,
        href: `https://github.com/kolikiscool/`,
    },
    {
        text: 'PhilTheTrain',
        image: `https://github.com/PhilTheTrain.png`,
        href: `https://github.com/PhilTheTrain/`,
    },
    {
        text: 'n0name',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'a_pc',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'premie_r',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
    {
        text: 'NamelessCat',
        image: `https://trampoline.turbowarp.org/avatars/by-username/NamelessCat`,
        href: "https://penguinmod.com/profile?user=NamelessCat",
    },
    {
        text: 'Just-Noone',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Just-Noone`,
        href: "https://penguinmod.com/profile?user=Just-Noone",
    },
    {
        text: 'goose_but_smart',
        image: `https://trampoline.turbowarp.org/avatars/by-username/goose_but_smart`,
        href: "https://penguinmod.com/profile?user=goose_but_smart",
    },
    {
        text: 'Le_Blob77',
        image: `https://trampoline.turbowarp.org/avatars/by-username/Le_Blob77`,
        href: "https://penguinmod.com/profile?user=Le_Blob77",
    },
    {
        text: 'MrRedstonia',
        image: `https://trampoline.turbowarp.org/avatars/by-username/MrRedstonia`,
        href: "https://penguinmod.com/profile?user=MrRedstonia",
    },
    {
        text: 'TheShovel',
        image: `https://trampoline.turbowarp.org/avatars/by-username/TheShovel`,
        href: "https://penguinmod.com/profile?user=TheShovel",
    },
    {
        text: 'SmolBoi37',
        image: `https://trampoline.turbowarp.org/avatars/by-username/SmolBoi37`,
        href: "https://penguinmod.com/profile?user=SmolBoi37",
    },
    {
        text: 'GigantTech',
        image: `https://trampoline.turbowarp.org/avatars/by-username/GigantTech`,
        href: "https://penguinmod.com/profile?user=GigantTech",
    },
    {
        text: 'hacker_anonimo',
        image: `https://trampoline.turbowarp.org/avatars/by-username/hacker_anonimo`,
        href: "https://penguinmod.com/profile?user=hacker_anonimo",
    },
    {
        text: 'zaaxd52',
        image: `https://trampoline.turbowarp.org/avatars/by-username/zaaxd52`,
        href: "https://penguinmod.com/profile?user=zaaxd52",
    },
    {
        text: 'G1nX',
        image: `https://trampoline.turbowarp.org/avatars/by-username/G1nX`,
        href: "https://penguinmod.com/profile?user=G1nX",
    },
    {
        text: 'FNFFortune',
        image: `https://trampoline.turbowarp.org/avatars/by-username/FNFFortune`,
        href: "https://penguinmod.com/profile?user=FNFFortune",
    },
    {
        text: 'Gabberythethughunte',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://penguinmod.com/profile?user=Gabberythethughunte",
    },
    {
        text: 'keriyo',
        image: `https://trampoline.turbowarp.org/avatars/by-username/keriyo`,
        href: "https://penguinmod.com/profile?user=keriyo",
    },
    {
        text: 'tijabe',
        image: `https://penguinmod.com/unknown_user.png`,
        href: "https://studio.penguinmod.com/credits.html#",
    },
];

const logoArtists = Promise.all([
    '593554048188416001'
].map(fromHardcodedDiscord));

const extensionDevelopers = [
    'GarboMuffin',
    'Ruby-Devs',
    'griffpatch',
    'DT-is-not-available',
    'SharkPool-SP',
    'Vadik1',
    'MikeDev101',
    'LilyMakesThings'
].map(fromHardcodedGithub);
const pmExtensionDevelopers = [
    'silvxrcat',
    'NexusKitten',
    'G1nX-01',
    'SharkPool-SP',
    'David-Orangemoon',
    'pooiod',
    'WAYLIVES',
    'MrRedstonia',
    'MikeDev101',
    'BopShoes',
    'AlexSchoolOH',
    'Monochromasity',
    'LilyMakesThings',
    'TheShovel'
].map(fromHardcodedGithub);

export default {
    addonDevelopers: shuffle(addonDevelopers),
    pmDevelopers: shuffle(pmDevelopers),
    logoArtists: shuffle(logoArtists),
    extensionDevelopers: shuffle(extensionDevelopers),
    pmExtensionDevelopers: shuffle(pmExtensionDevelopers),
    pmApiDevelopers: shuffle(pmApiDevelopers),
    pmTranslators: shuffle(pmTranslators),
    pmPullRequestDevelopers: shuffle(pmPullRequestDevelopers)
};
