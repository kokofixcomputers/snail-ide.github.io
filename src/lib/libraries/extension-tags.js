import messages from './tag-messages.js';
export default [
    { tag: 'penguinmod', intlLabel: messages.penguinmod },
    { tag: 'other_mods', intlLabel: messages.other_mods },
    { tag: 'turbowarp', intlLabel: messages.turbowarp },
    { tag: 'scratch', intlLabel: messages.scratch },
    { tag: 'divider2', intlLabel: messages.scratch, type: 'divider' },
    { tag: 'categoryexpansion', intlLabel: messages.categoryexpansion },
    { tag: 'programminglanguage', intlLabel: messages.programminglanguage },
    { tag: 'datamgmt', intlLabel: messages.datamgmt },
    { tag: 'hardware', intlLabel: messages.hardware },
    { tag: 'divider1', intlLabel: messages.scratch, type: 'divider' },
    { tag: 'library', intlLabel: messages.library },
    { tag: 'extcreate', intlLabel: messages.extcreate },
    { tag: 'divider3', intlLabel: messages.scratch, type: 'divider' },
    { tag: 'divider1', intlLabel: 'Actions', type: 'title' },
    { tag: 'custom', intlLabel: messages.customextension, type: 'custom', func: (library) => {
        library.select(''); // selects custom extension since it's id is ''
    } },
];
