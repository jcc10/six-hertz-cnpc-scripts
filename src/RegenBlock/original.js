// Original by Runon. Used with permission.


var MCP = {
    "functions": {
        "ItemStack_getItem": "func_77973_b",
        "Item_getEquipmentSlot": "func_185083_B_",
        "EntityLivingBase_travel": "func_191986_a",
        "EntityLivingBase_setAIMoveSpeed": "func_70659_e",
        "EntityLivingBase_getAIMoveSpeed": "func_70689_ay",
        "EntityLiving_getMoveHelper": "func_70605_aq",
        "EntityMoveHelper_strafe": "func_188488_a",
        "ISaveHandler_getWorldDirectory": "func_75765_b"
    },
    "fields": {
        "World_isRemote": "field_72995_K",
        "World_worldInfo": "field_72986_A",
        "World_saveHandler": "field_73019_z",
        "Entity_onGround": "field_70122_E",
    }
    
};

var MCItem = Java.type("net.minecraft.item.Item");
var MCItemArmor = Java.type("net.minecraft.item.ItemArmor");
var MCItemBow = Java.type("net.minecraft.item.ItemBow");
var MCItemSword = Java.type("net.minecraft.item.ItemSword");
var MCItemTool = Java.type("net.minecraft.item.ItemTool");
var EntityEqSlot = Java.type("net.minecraft.inventory.EntityEquipmentSlot");
var REGISTRY = Java.type('net.minecraftforge.fml.common.registry.ForgeRegistries');


function getItemType(iitemstack, mcentity) {
	if(typeof(mcentity) == typeof(undefined) || mcentity === null) { mcentity = null; }
    var mcitem = iitemstack.getMCItemStack()[MCP.ItemStack_getItem]();
    if(mcitem instanceof MCItemBow) {
        return "BOW";
    }
    if(mcitem instanceof MCItemSword) {
        return "SWORD";
    }
    if(mcitem instanceof MCItemTool) {

        return "TOOL";
    }
    if(mcitem instanceof MCItemArmor) {
        if(mcentity != null) {
            if(mcitem.isValidArmor(iitemstack.getMCItemStack(), EntityEqSlot.CHEST, mcentity)) {
                return "ARMOR_CHEST";
            }
        }
        return "ARMOR";
    }
    return "NONE";
}


function getEnchIdByName(name) {
    var enchants = REGISTRY.ENCHANTMENTS.getValues();
    for(var r in enchants) {
var ench = enchants[r];
        if(name == REGISTRY.ENCHANTMENTS.getKey(ench)) {
            return parseInt(REGISTRY.ENCHANTMENTS.getID(ench));
        }
    }

    return null;
}
var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
var INbt = Java.type('noppes.npcs.api.INbt');
var LogManager = Java.type('org.apache.logging.log4j.LogManager');
var Logger = LogManager.getLogger(typeof CONFIG_SERVER != typeof undefined ? CONFIG_SERVER.NAME : "");
var ForgeLoader = Java.type('net.minecraftforge.fml.common.Loader').instance();
var EntityType = Java.type('noppes.npcs.api.constants.EntityType');
var REGISTRY = Java.type('net.minecraftforge.fml.common.registry.ForgeRegistries');

var NbtTypes = {
    "Byte": 1,
    "Short": 2,
    "Integer": 3,
    "Long": 4,
    "Float": 5,
    "Double": 6,
    "ByteArray": 7,
    "String": 8,
    "List": 9,
    "Compound": 10,
    "IntegerArray": 11,
};

function getNbtType(num) {
    for(var n in NbtTypes) {
var nbtType = NbtTypes[n];
        if(nbtType === num) { return n; }
    }
    return null;
}

function getMCModList() {
    var modlist = [];
    var loadmods = Java.type("net.minecraftforge.fml.common.Loader").instance().getModList();

    for(var mid in loadmods) {
var lmod = loadmods[mid];
        modlist.push(lmod.getModId());
    }

    return modlist;
}

function hasMCMod(name) {
    return getMCModList().indexOf(name) > -1;
}


function getAllPotions() {
    var POTIONS = REGISTRY.POTIONS.getValues();
    var allPotions = [];
    for (var i in POTIONS) {
        var pot = POTIONS[i];
        var pname = REGISTRY.POTIONS.getKey(pot);
        var pid = REGISTRY.POTIONS.getID(pot);
        allPotions.push({
            'name': pname.toString(),
            'id': pid
        });
    }

    return allPotions;
}

function getAllEnchants() {
    var ENCHANTS = REGISTRY.ENCHANTMENTS.getValues();
    var allEnchants = [];
    for (var i in ENCHANTS) {
        var ench = ENCHANTS[i];
        var ename = REGISTRY.ENCHANTMENTS.getKey(ench);
        var eid = REGISTRY.ENCHANTMENTS.getID(ench);
        allEnchants.push({
            'name': ename.toString(),
            'maxLevel': ench.func_77325_b(),
            'minLevel': ench.func_77319_d(),
            'isTreasureEnchant': ench.func_185261_e(),
            'isCurse': ench.func_190936_d(),
            'id': eid
        });
    }

    return allEnchants;
}

function getAllBiomes() {
    var BIOMES = REGISTRY.BIOMES.getValues();
    var allBiomes = [];
    for (var i in BIOMES) {
        var bio = BIOMES[i];
        var bname = REGISTRY.BIOMES.getKey(bio);
        var bid = REGISTRY.BIOMES.getID(bio);
        allBiomes.push({
            'name': bname.toString(),
            'id': bid
        })
    }

    return allBiomes;
}

function getAllEntities() {
    var ENTITIES = REGISTRY.ENTITIES.getValues();
    var allEntities = [];
    for (var i in ENTITIES) {
        var entity = ENTITIES[i];
        var bname = REGISTRY.ENTITIES.getKey(entity);
        var bid = REGISTRY.ENTITIES.getID(entity);
        allEntities.push({
            'name': bname.toString(),
            'id': bid
        })
    }

    return allEntities;
}
//Get data from IData
function data_get(data, keys) {
	var get = {};
	for(var k in keys) {
		//var key = keys[k];
		get[keys[k]] = data.get(keys[k]);
		//if(get[keys[k]] == null) { get[keys[k]] = keys[k]; }
	}

	return get;
}

//Add data to IData if it doesn't exist
function data_register(data, vals) {
	for(var k in vals) {
var val = vals[k];
		if(data.get(k) == null) { data.put(k, val); }
	}
}

//Add data to IData even if it does exist
function data_overwrite(data, keys, vals) {
	if(typeof(keys) == typeof(undefined) || keys === null) { keys = []; }
	if(typeof(vals) == typeof(undefined) || vals === null) { vals = []; }
	if(typeof(keys) == 'string') { keys = [keys]; }
	if(typeof(vals) == 'string') { vals = [vals]; }

	for(var k in keys) {
		var key = keys[k];
		var val = vals[k];
		data.put(key, val);
	}
}
//Compare 2 IItemStacks
function isItemEqual(stack, other, ignoreNbt){
	if(typeof(ignoreNbt) == typeof(undefined) || ignoreNbt === null) { ignoreNbt = false; }
	if (!other || other.isEmpty()) {
		return false;
	}

	var stackNbt = stack.getItemNbt();
	stackNbt.remove('Count');
	var otherNbt = other.getItemNbt();
	otherNbt.remove('Count');

	if(ignoreNbt) {
		if(stackNbt.getString("id") == otherNbt.getString("id")) {
			return true;
		}
	} else {
		if(isNbtEqual(stackNbt, otherNbt)) {
			return true;
		}
	}

	return false;
}


function ENbt(nbtObject) {
    this.nbt = nbtObject; /* INbt */
    this.copy = function() {
        return new ENbt(API.stringToNbt(this.nbt.toJsonString()));
    };
    this.get = function(path) {
        var paths = path.toString().split(".");
        var cur = this.nbt;
        for(var pa in paths) {
var p = paths[pa];
            if(!cur.has(p)) {
                return null;
            }

            var keyType = getNbtType(cur.getType(p));
            if(keyType != "List") {
                //getString, getInteger etc
                cur = cur["get"+keyType](p);
            } else {
                cur = cur["get"+keyType](p, cur.getListType(p));
            }
        }
        return cur;
    };
    this.toJsonString = function() { return this.nbt.toJsonString(); }
    this.toJsonObj = function() { return JSON.parse(this.toJsonString()); }
}

function nbtCopy(nbt) {
	return API.stringToNbt(nbt.toJsonString());
}

function nbtToObject(nbt) {
    return nbt.toJsonString().replace(/"([\w:]+?)": (\d)\w/g, '"$1": $2');
}

function nbtItem(nbt, w) {
	if(typeof(nbt) == 'string') { nbt = API.stringToNbt(nbt); }
	var item = w.createItemFromNbt(nbt);
	return item;
}

function nbtGetList(nbt, list) {
    return (nbt.has(list) ? nbt.getList(list, nbt.getListType(list)) : null);
}

//Turn String[] with item nbts to IItemStack[]
function nbtItemArr(nbtArr, w) {
    var itemArr = [];
	for(var itemData in nbtArr) {
var item = nbtArr[itemData];
        itemArr.push(nbtItem(item, w));
    }

    return itemArr;
}

function isNbtEqual(nbt, otherNbt) {
    return nbt.toJsonString() == otherNbt.toJsonString();
}

function nbtHasSameData(nbt, onbt) {
    //TODO:compare keys of nbt
}function givePlayerItems(player, stacks, pnbt) {
	if(typeof(pnbt) == typeof(undefined) || pnbt === null) { pnbt = null; }
    var w = player.world;
    if (pnbt == null) {
        pnbt = player.getEntityNbt(); //Dont over-use this one
    }
    var invcnt = getPlayerInvCount(pnbt, w);
    for(var s in stacks) {
var stack = stacks[s];
        if (invcnt < 36) {
            //Player inv not full
            player.giveItem(stack);
            invcnt++;
        } else {
            player.dropItem(stack);
        }
    }
}

//Made for givePlayerItems (does not include armor and offhand)
function getPlayerInvCount(pnbt, w) {
    return getPlayerInvFromNbt(pnbt, w, function(item, itnbt) {
        //Exclude armor slots and offhand
        return ["-106", "100", "101", "102", "103"].indexOf(itnbt.getByte('Slot').toString()) == -1;
    }).length;
}

function getArrItemCount(array, itemstack, ignoreNbt) {
	if(typeof(ignoreNbt) == typeof(undefined) || ignoreNbt === null) { ignoreNbt = false; }
    var icount = 0;
    for(var pi in array) {
var pitem = array[pi];
        var pinbt = pitem.getItemNbt();
        var scount = parseInt(pinbt.getByte('Count'));
        if (isItemEqual(itemstack, pitem, ignoreNbt))
            icount += scount;
    }

    return icount;
}

function getPlayerInvFromNbt(pnbt, w, filterFn) {
	if(typeof(filterFn) == typeof(undefined) || filterFn === null) { filterFn = null; }
    var pinv = pnbt.getList('Inventory', pnbt.getListType('Inventory'));
    var pitems = [];
    for(var p in pinv) {
var pin = pinv[p];
        var pitm = w.createItemFromNbt(API.stringToNbt(pin.toJsonString()));
        //pin (INbt) contains key "Slot"
        //pitm.getItemNbt() does not, thats why pin is passed
        if ((filterFn == null ? true : filterFn(pitm, pin, w))) {
            pitems.push(pitm);
        }
    }

    return pitems;
}

function getInvItemCount(pnbt, itemstack, w, ignoreNbt) {
    return getArrItemCount(getPlayerInvFromNbt(pnbt, w), itemstack, ignoreNbt);
}

function playerIsOnline(world, player) {
    var isOnline = false;
    var pl = world.getAllPlayers();
    for (var p in pl) {
        if (pl[p].getName() == player.toString()) {
            isOnline = true;
            break;
        }
    }
    return isOnline;
}

function getChatMessage(player, team, color, message) {
    //time
    var curTimeStr = new Date().toLocaleTimeString("fr-FR").split(":");
    curTimeStr.pop();
    curTimeStr = curTimeStr.join(":");
    var ccode = getColorId(color);
    return "[" + curTimeStr + "] &l&" + ccode + "[&" + ccode + team + "&r &" + ccode + player + "&l&" + ccode + "] -> &r" + message;
}

function getChatTag(player, team, color) {
    var ccode = getColorId(color);
    return "&" + ccode + "&l[&" + ccode + "&o" + team + "&r &" + ccode + player + "&" + ccode + "&l]";
}

function scanPlayerOnNbt(player, nbtstring) {
    return player.getEntityNbt().getCompound('Inventory').toJsonString().indexOf(nbtstring.toString()) > -1;
}function normalizePos(pos, asObj) {
	if(typeof(asObj) == typeof(undefined) || asObj === null) { asObj = false; }
    if (!asObj) {
        return [
            pos.x,
            pos.y,
            pos.z,
        ];
    } else {
        return {
            'x': pos.x,
            'y': pos.y,
            'z': pos.z
        }
    }
}function getChunk(pos) {
    return [Math.floor(pos.x/16), Math.floor(pos.z/16)];
}

function getChunkCoords(chunk) {
    return [
        chunk[0]*16,
        chunk[1]*16,
        (chunk[0]+1)*16 - 1,
        (chunk[1]+1)*16 - 1,
    ];
}

function inChunk(pos, chunk) {
    var coords = getChunkCoords(chunk);
    return (
        pos.x >= coords[0],
        pos.z >= coords[1],
        pos.x <= coords[2],
        pos.z >= coords[3]
    );
}
function array_shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function array_filter(a, fn) {
    var aa = [];
    for (var i in a) {
        if (fn(a[i])) { aa.push(a[i]); }
    }

    return aa;
}

function array_dist(a) {
    var b = [];
    for (var c in a) {
        if (b.indexOf(a[c]) == -1) {
            b.push(a[c]);
        }
    }

    return b;
}

function array_remove(array, element) {
    var index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function removeFromArray(arr, vals) {
    if (typeof(vals) == 'string') { vals = [vals]; }
    var a = arr;
    for(var v in vals) {
var val = vals[v];
        array_remove(a, val);
    }
    return a;
}

function removeFromArrayByKey(arr, keys) {
    var narr = [];
    for(var k in keys) {
var key = keys[k];
        keys[k] = parseInt(key);
    }
    for(var i in arr) {
var ari = arr[i];
        if (keys.indexOf(i) > -1) {
            narr.push(ari);
        }
    }
    return narr;
}


function array_merge(a1, a2) {
    var bb = [];
    for (var k in a1) {
        bb[k] = a1[k];
    }
    for (var k in a2) {
        bb[k] = a2[k];
    }
    return bb;
}

function arrayTransform(arr, elfn) {
    var newa = [];
    for(var a in arr) {
var arri = arr[a];
        newa.push(elfn(arri, a, arr));
    }
    return newa;
}

function arrayTakeRange(arr, start, end) {
	if(typeof(end) == typeof(undefined) || end === null) { end = null; }
    if (end == null) { end = arr.length; }
    var a = [];
    var _end = Math.min(end, arr.length);
    var _start = Math.min(start, _end);
    for (var i = _start; i < Math.min(end, arr.length); i++) {
        if (typeof(arr[i]) != typeof(undefined)) {
            a.push(arr[i]);
        }
    }
    return a;
}

function arrayOccurs(string, subArray, allowOverlapping, caseSensitive) {
	if(typeof(allowOverlapping) == typeof(undefined) || allowOverlapping === null) { allowOverlapping = false; }
	if(typeof(caseSensitive) == typeof(undefined) || caseSensitive === null) { caseSensitive = true; }
    var occ = 0;
    for(var i in subArray) {
var sel = subArray[i];
        occ += occurrences(string, sel, allowOverlapping, caseSensitive);
    }

    return occ;
}

function arrayFormat(array, format, sep) {
    var joined = "";
    for (var i = 0; i < array.length; i++) {
        joined += format.fill({
            "VALUE": array[i]
        }) + (i == array.length - 1 ? "" : sep || " ");
    }
    return joined;
}

Array.__proto__.count = function(array, value, strict){
	if(typeof(strict) == typeof(undefined) || strict === null) { strict = false; }
    var count = 0;
    for(var i = 0; i < array.length; i++) {
        if(strict ? array[i] === value : array[i] == value) {
            count++;
        }
    }

    return count;  
}//==Reallife date handler for hiring regions etc

Date.prototype.addTime = function(addTime) {
    this.setTime(this.getTime() + addTime);
};

Date.prototype.hasPassed = function(passDate) {
    return (this.getTime() >= passDate.getTime());
};

//Converts TimeString to number
function getStringTime(timeString) {
    //0y4mon3d 6h 8min3s 800ms
    var reg = /([\d]+)([a-zA-Z]+)/g;
    var _m = timeString.match(reg);
    var newTime = NaN;
    var _tk = Object.keys(msTable);

    for (var m in _m) {
        var fm = _m[m];
        var nm = fm.replace(reg, '$1').cInt();
        var om = fm.replace(reg, '$2');
        if (nm != null) {
            if (isNaN(newTime)) { newTime = 0; }
            if (_tk.indexOf(om) != -1) {
                newTime += nm * (msTable[_tk[_tk.indexOf(om)]]);
            } else { newTime += nm; }
        }
    }

    return newTime;
}
//Converts number to TimeString
function getTimeString(stringTime, excludes) {
	if(typeof(excludes) == typeof(undefined) || excludes === null) { excludes = []; }
    var newTime = parseInt(stringTime);
    var newStr = '';
    for (var ms in msTable) {
        if (excludes.indexOf(ms) == -1) {
            var msnum = 0;
            while (newTime >= msTable[ms]) {
                msnum++;
                newTime -= msTable[ms];
            }
            if (msnum > 0) {
                newStr += msnum.toString() + ms;
            }
        }
    }


    return newStr;
}


function getDateString(val, mode, dateSeperator, timeSeperator) {
	if(typeof(mode) == typeof(undefined) || mode === null) { mode = null; }
	if(typeof(dateSeperator) == typeof(undefined) || dateSeperator === null) { dateSeperator = '/'; }
	if(typeof(timeSeperator) == typeof(undefined) || timeSeperator === null) { timeSeperator = ':'; }
    var date = new Date();
    date.setTime(val);

    var outputStr = '';

    if ((mode || 'date') == 'date') {
        var showDay = date.getDate();
        var showMonth = (date.getMonth() + 1).toString().padStart(2, '0');
        var showYear = date.getFullYear();
        outputStr += showDay + dateSeperator + showMonth + dateSeperator + showYear + (mode == null ? ' ' : '');
    }
    if ((mode || 'time') == 'time') {
        var showHours = date.getHours().toString().padStart(2, '0');
        var showMins = date.getMinutes().toString().padStart(2, '0');
        var showSecs = date.getSeconds().toString().padStart(2, '0');
        outputStr += showHours + timeSeperator + showMins + timeSeperator + showSecs;
    }

    return outputStr;
}function getFnArgs(fn) {
	var fnrgx = /function[\s]+([\w]+)\(([\w,\s]+)\)/;
	var fnstr = fn.toString();
	var fnargs = [];
	var m = fnstr.match(fnrgx);
	if(m != null) {
		
      	m[2].split(',').forEach(function(a){
        	fnargs.push(a.trim());
        });
      	
      	return fnargs;
	}
	
	return fnargs;
}
//Convert object to array
function objArray(obj) {
    var a = [];
    for(var i in obj) {
var o = obj[i];
        a.push(o);
    }
    return a;
}

function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function getObjectProp(obj, prop) {
    var objRgx = /([\w]+)(?:\[(\d+)\])?/g;
    var match;
    while ((match = objRgx.exec(prop)) !== null) {
        //handle key
        if (typeof obj[match[1]] === 'undefined') {
            return null;
        }

        obj = obj[match[1]];

        if (typeof match[2] !== 'undefined') {
            if (typeof obj[parseInt(match[2])] === 'undefined') {
                return null;
            }

            obj = obj[parseInt(match[2])];
        }
    }

    return obj
}

//Get functions in the object
function getAllFuncs(obj) {
    var props = [];

    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function(e, i, arr) {
        if (e != arr[i + 1] && typeof obj[e] == 'function') return true;
    });
}

//Merge 2 objects
function objMerge(obj1, obj2, inheritNewProps) {
	if(typeof(inheritNewProps) == typeof(undefined) || inheritNewProps === null) { inheritNewProps = true; }
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) {
        if (inheritNewProps || Object.keys(obj1).indexOf(attrname) > -1) {
            obj3[attrname] = obj2[attrname];
        }
    }
    return obj3;
}

Object.__proto__.assign = function() {
    var obj = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];
        for(var key in arg) {
var value = arg[key];
            obj[key] = value;
        }
    }

    return obj;
};

Object.__proto__.values = function(obj) {
        var vals = [];
        for (var i in obj) {
            vals.push(obj[i]);
        }

        return vals;
    }
    /* */

function formatObj(obj, options, tabIndex, maxDeep, maxLoop, propTypes, propType, argFn) {
	if(typeof(propTypes) == typeof(undefined) || propTypes === null) { propTypes = {}; }
	if(typeof(argFn) == typeof(undefined) || argFn === null) { argFn = null; }
    if (typeof obj === 'object' && obj !== null && !(obj instanceof Java.type('java.lang.Object'))) {

        var tabIndex = (typeof tabIndex === 'undefined' || tabIndex == null) ? 1 : tabIndex;
        var isObjArray = isArray(obj);
        var tabs = '';
        var prevTabs = '';
        for (var i = 0; i < tabIndex; i++) {
            tabs += '  ';
            if (i < tabIndex - 1) {
                prevTabs += '  ';
            }
        }

        var str = prevTabs + '&8[\n';
        if (tabIndex <= maxDeep || maxDeep === -1 || typeof maxDeep === 'undefined') {
            var index = 0;
            for (var i in obj) {
                if (index > maxLoop && typeof maxLoop !== 'undefined' && maxLoop !== -1) {
                    str += tabs + '&e&l...\n';
                    break;
                }
                index++;
                var passPropType = propTypes[i] || null;
                var args = {
                    obj: obj,
                    tabIndex: tabIndex,
                    maxDeep: maxDeep,
                    maxLoop: maxLoop,
                    propTypes: propTypes,
                    passPropType: passPropType,
                    argFn: argFn
                };

                if (typeof argFn === 'function') {
                    argFn.apply(args);
                }

                str += tabs + (parseInt(i).toString() == i.toString() ? '&b' + i : '&c"' + i + '"') + '&7 => ' + formatObj(obj[i], options, args.tabIndex + 1, args.maxDeep, args.maxLoop, args.propTypes, args.passPropType, args.argFn) + ',\n';
            }
        } else {
            str += tabs + '&e&l...\n';
        }

        str += prevTabs + '&8]';
        return str;
    }
    // print(JSON.stringify([propTypes, propType]));
    var typeStr = '';
    switch (propType) {
        case 'money':
            obj = '&r:money:&e' + getAmountCoin(obj) + '&7';
            break;
        case 'time':
            obj = '&e' + getTimeString(obj) + '&7';
            break;
        case 'date':
            obj = '&e' + getDateString(obj) + '&7';
            break;
        default:
            
            if(options.showTypes) {
                typeStr = '&3&o&l('+(typeof obj)+')&r';
            }

            if (obj == null) {
                obj = '&6&lnull&7';
            } else if (typeof obj === 'string') {
                obj = '&a"' + obj + '"&7';
            } else if (typeof obj === 'number') {
                obj = '&e' + obj.toString() + '&7';
            } else if (typeof obj === 'boolean') {
                obj = '&3' + obj.toString() + '&7';
            } else {
                obj = obj.toString();
            }
            break;
    }

   

    return typeStr + obj;
}; /* */if(typeof(Object.values) !== "function")  {
    Object.values = function(obj){
        var v = [];
        for(var i in obj) {
var oi = obj[i];
            v.push(oi);
        }

        return v;
    }
}
if(typeof(Object.keys) !== "function")  {
    Object.keys = function(obj){
        var v = [];
        for(var i in obj) {
var oi = obj[i];
            v.push(i);
        }

        return v;
    }
}
String.prototype.allMatch = function(regx) {
    var m = this.match(regx);
    var rr = [];
    for (var mm in m) {
        var mt = m[mm];
        var rx = regx.exec(this);
        rr.push(rx);
    }

    return rr;
};


String.prototype.cmatch = function(regx) {
    return (this.match(regx) || []).length;
};

String.prototype.rangeUpper = function(min, max) {
    var str = '';
    for (var i = 0; i < this.length; i++) {
        var c = this.substring(i, i + 1); //curchar
        if (i >= min && i < max) {
            c = c.toUpperCase();
        }
        str += c.toString();
    }
    return str;
};
String.prototype.rangeLower = function(min, max) {
    var str = '';
    for (var i = 0; i < this.length; i++) {
        var c = this.substring(i, i + 1); //curchar
        if (i >= min && i < max) {
            c = c.toLowerCase();
        }
        str += c.toString();
    }
    return str;
};

String.prototype.pad = function(character, len) {
    var n = this.toString();
    for (var i = n.length; i < len; i++) {
        n += character.toString();
    }
    return n;
};

String.prototype.fill = function(payload) {
    var str = this.toString();
    for(var p in payload) {
var payl = payload[p];
        str = str.split("{" + p + "}").join(payl);
    }
    return str;
}

String.prototype.padMiddle = function(character, len) {

    var n = this.toString();
    var sc = Math.floor((len - n.length) / 2);
    var ns = '';
    for (var i = 0; i < sc; i++) {
        ns += character.toString();
    }
    ns += n;
    for (var i = 0; i < sc; i++) {
        ns += character.toString();
    }
    return ns;
};

String.prototype.cInt = function() {
    return (isNaN(parseInt(this)) ? null : parseInt(this));
};


String.prototype.append = function(ch, amount) {
    var new_str = this.toString();
    for (var i = 0; i < amount; i++) {
        if (i >= new_str.length) {
            new_str += ch.toString();
        }
    }

    return new_str;
};

String.prototype.prepend = function(ch, amount) {
    var new_str = this.toString();
    for (var i = 0; i < amount; i++) {
        if (i >= new_str.length) {
            new_str = ch.toString() + new_str;
        }
    }

    return new_str;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this.toString();
    if (typeof(search) == 'string') { search = [search]; }
    for(var s in search) {
var sr = search[s];
        target = target.split(sr).join(replacement);
    }
    return target;
};

function occurrences(string, subString, allowOverlapping, caseSensitive) {
	if(typeof(allowOverlapping) == typeof(undefined) || allowOverlapping === null) { allowOverlapping = false; }
	if(typeof(caseSensitive) == typeof(undefined) || caseSensitive === null) { caseSensitive = true; }
    string = string.toString()
    subString = subString.toString()

    if (!caseSensitive) {
        string = string.toLowerCase();
        subString = subString.toLowerCase();
    }

    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function stringIsNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function stringIsBool(n) {
    return (['true', 'false'].indexOf(n.toLowerCase()) > -1);
}

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = (typeof padString !== 'undefined' ? padString : ' ').toString();
        if (this.length > targetLength) {
            return this.toString();
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + (this).toString();
        }
    };
}

if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = (typeof padString !== 'undefined' ? padString : ' ').toString();
        if (this.length > targetLength) {
            return (this).toString();
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return (this) + padString.slice(0, targetLength);
        }
    };
}


function executeCommand(player, command, as_player) {
	if(typeof(as_player) == typeof(undefined) || as_player === null) { as_player = null; }
	if(as_player == null) { as_player = player.getName(); }
	var cmd = API.createNPC(player.world.getMCWorld());

	return cmd.executeCommand("/execute "+as_player+" ~ ~ ~ "+command);

}

function executeCommandGlobal(command, dim) {
	if(typeof(dim) == typeof(undefined) || dim === null) { dim = 0; }
	return API.createNPC(API.getIWorld(dim).getMCWorld()).executeCommand(command);
}


var UNI = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
];
var CHAT_EMOTES = {
    "check": "\u9366",
    "hp": "\u9390",
    "hphalf": "\u9391",
    "hpempty": "\u938E",
    "cross": "\u9367",
    "sun": "\u2739",
    "star": "\u2729",
    "recycle": "\u267B",
    "seagull": "\u932A",
    //emoji
    "cool": "\u9914",
    "shocked": "\u9915",
    "smile": "\u9916",
    "joy": "\u9917",
    "wink": "\u9918",
    "happy": "\u9919",
    "crazy": "\u991A",
    "shrug": "\u991B",
    "thonk": "\u950B",
    //Misc
    "wifi5": "\u936A",
    "wifi4": "\u936B",
    "wifi3": "\u936C",
    "wifi2": "\u936D",
    "wifi1": "\u936E",
    "wifi0": "\u936F",
    "lang": "\u935C",
    "money": "\u932B",
    "trin": "\u932D",
    "unu": "\u932E",
    "wheel": "\u9509",
    "folder": "\u932F",
    "thumbsup": "\u93F3",
    "thumbsdown": "\u93F4",
    "bomb": "\u93F5",
    "hazard": "\u93F6",
    "ying": "\u93F7",
    "danger": "\u93F8",
    "noperm": "\u93F9",
    "gear": "\u93FA",
    "stats": "\u93FB",
    "medal_choco": "\u9508",
    "medal_bronze": "\u9507",
    "medal_silver": "\u9506",
    "medal_gold": "\u9505",
    "medal_diamond": "\u9504",
    "medal_emerald": "\u9503",
    "medal": "\u9502",
    "trophy": "\u950A",
    "unlock": "\u937E",
    "lock": "\u937F",
    "car": "\u950D",
    "computer": "\u950E",
    "factory": "\u950F",
    //coins
    "coin_stone": "\u9698",
    "coin_iron": "\u9699",
    "coin_gold": "\u969A",
    "coin_diamond": "\u969B",
    "coin_emerald": "\u969C",
    //Arrows
    "arrow_u": "\u9920",
    "arrow_ur": "\u9921",
    "arrow_r": "\u9922",
    "arrow_dr": "\u9923",
    "arrow_d": "\u9924",
    "arrow_dl": "\u9925",
    "arrow_l": "\u9926",
    "arrow_ul": "\u9927",
    //Mobs
    "creeper": "\u92C0",
    "ccreeper": "\u92C1",
    "skeleton": "\u92C2",
    "wskeleton": "\u92C3",
    "spider": "\u92C4",
    "zombie": "\u92C5",
    "vzombie": "\u92C6",
    "slime": "\u92C7",
    "ghast": "\u92C8",
    "oghast": "\u92C9",
    "pigzombie": "\u92CA",
    "enderman": "\u92CB",
    "blaze": "\u92CE",
    "mslime": "\u92CF",
    "illager": "\u92D1",
    "pig": "\u92D3",
    "sheep": "\u92D4",
    "cow": "\u92D5",
    "chicken": "\u92D6",
    "villager": "\u92E5",

    //items
    "iron_ingot": "\u90B0",
    "gold_ingot": "\u90B1",
    "brick": "\u90B2",
    "nether_brick": "\u90B3",
    "coal": "\u90B4",
    "ccoal": "\u90B5",
    "diamond": "\u90B6",
    "ruby": "\u90B7",
    "emerald": "\u90B8",
    "nether_star": "\u90BD",
    "exp": "\u9901",
    "gapple": "\u9902",
    //blocks items
    "coal_ore": "\u9220",
    "iron_ore": "\u9221",
    "gold_ore": "\u9222",
    "redstone_ore": "\u9223",
    "diamond_ore": "\u9224",
    "lapis_ore": "\u9225",
    "emerald_ore": "\u9226",
    "coal_block": "\u9230",
    "iron_block": "\u9231",
    "gold_block": "\u9232",
    "redstone_block": "\u9233",
    "diamond_block": "\u9234",
    "lapis_block": "\u9235",
    "emerald_block": "\u9236",
    "cobble": "\u9227",
    "mosscobble": "\u9228",
    "stone": "\u9229",
    "chest": "\u92F9",
    "enderchest": "\u92FB",
    "giftchest": "\u92FC",
    "pumpkin": "\u9270",
    "jacklantern": "\u9271",
    "melon": "\u9274",
    "cactus": "\u9276",
    "sponge": "\u927C",
    "tnt": "\u927E",
    "lit": "\u9200",
    "fire": "\u95AF",
    "water": "\u920B",
    "lava": "\u920E",
    "portal": "\u920F",
    "log": "\u926B",
    "log2": "\u926C",
    "wood": "\u926D",
    "bookcase": "\u926E",
    "trapdoor": "\u926F",
    "lamp_on": "\u9248",
    "lamp_off": "\u9247",

    //box drawing
    "railsv": "\u91E0",
    "railsh": "\u91E8",
    "rails_ru": "\u91F0",
    "rails_lu": "\u91F1",
    "rails_rd": "\u91E1",
    "rails_ld": "\u91E9",
    "prailsv_off": "\u91E2",
    "prailsv_on": "\u91E3",
    "drailsv_off": "\u91E4",
    "drailsv_on": "\u91E5",
    "arailsv_off": "\u91E6",
    "arailsv_on": "\u91E7",

    "prailsh_off": "\u91EA",
    "prailsh_on": "\u91EB",
    "drailsh_off": "\u91EC",
    "drailsh_on": "\u91ED",
    "arailsh_off": "\u91EE",
    "arailsh_on": "\u91EF",

    //Foods
    "creamcookie": "\u932C",
    "cookie": "\u90EB",
    "cake": "\u90EC",
    "ppie": "\u90ED",
    "meat_prime": "\u95AA",
    "meat_big": "\u95A8",
    "meat_medium": "\u95A9",
    "meat_small": "\u95A7",
    "meat_gold": "\u95AB",

    //Weapons and tools
    "wooden_sword": "\u9000",
    "wooden_pickaxe": "\u9001",
    "wooden_shovel": "\u9002",
    "wooden_axe": "\u9003",
    "wooden_hoe": "\u9004",

    "stone_sword": "\u9005",
    "stone_pickaxe": "\u9006",
    "stone_shovel": "\u9007",
    "stone_axe": "\u9008",
    "stone_hoe": "\u9009",

    "golden_sword": "\u900A",
    "golden_pickaxe": "\u900B",
    "golden_shovel": "\u900C",
    "golden_axe": "\u900D",
    "golden_hoe": "\u900E",

    "iron_sword": "\u9010",
    "iron_pickaxe": "\u9011",
    "iron_shovel": "\u9012",
    "iron_axe": "\u9013",
    "iron_hoe": "\u9014",

    "diamond_sword": "\u9015",
    "diamond_pickaxe": "\u9016",
    "diamond_shovel": "\u9017",
    "diamond_axe": "\u9018",
    "diamond_hoe": "\u9019",


    "box": "\u2B1B",

    "gun": "\u9684",
    "shotgun": "\u950C",
    "rifle": "\u9683",
};//config for gramados

//Configure your own currency units
//Units of currency, with own names, with lowest unit being 1
var _COINTABLE = { //MUST BE FROM LOW TO HIGH
    'c': 1,
    'g': 100,
    'k': 100000,
    'm': 100000000,
    'b': 100000000000,
    't': 100000000000000,
    'q': 100000000000000000,
    's': 100000000000000000000
}; //With this setup, the syntax for 223503 would be 2k235g3c (case-INSensitive)

var VIRTUAL_CURRENCIES = [{
        "name": "amoney",
        "displayName": "Arcade Money",
        "displayPrefix": "&c",
        "default": 0,
        "prefix": "&3:money:A",
        "color": "&b",
        "suffix": "",
    },
    {
        "name": "vmoney",
        "displayName": "Vote Money",
        "displayPrefix": "&5",
        "default": 0,
        "prefix": "&d:money:V",
        "color": "&d",
        "suffix": "",
    },
    {
        "name": "credit",
        "displayName": "Store Money",
        "displayPrefix": "&c&l",
        "default": 0,
        "prefix": "&c:money:",
        "color": "&c",
        "suffix": "",
    },
    {
        "name": "money",
        "displayName": "Money",
        "displayPrefix": "&2&l",
        "default": 0,
        "prefix": "&r:money:&e",
        "color": "&e",
        "suffix": "",
        "items": true
    }
];

var CURRENCIES = VIRTUAL_CURRENCIES.map(function(currency){
    return currency.name;
});

function getCurrency(type) {
    for(var i in VIRTUAL_CURRENCIES) {
var currency = VIRTUAL_CURRENCIES[i];
        if (currency.name != type) {
            continue;
        }
        return currency;
        break;
    }

    return null;
}


function formatCurrency(amount, currencyType) {
	if(typeof(currencyType) == typeof(undefined) || currencyType === null) { currencyType = 'money'; }
    for(var i in VIRTUAL_CURRENCIES) {
var currency = VIRTUAL_CURRENCIES[i];
        if (currency.name != currencyType) {
            continue;
        }

        return currency.prefix + getAmountCoin(amount) + currency.suffix;

        break;
    }

    return null;
}


//Currency settings
var _COINITEMNAME = '&2&lMoney&r'; //Custom name of currency
var _COINITEM_PREFIX = '&e'; //Prefix showing before money value lore (used for color coding)

//Your money items, and their values in money syntax
//"value": "item_id",
var LOWVALUE_ID = "variedcommodities:coin_iron";
var MIDVALUE_ID = "variedcommodities:money";
var HIGHVALUE_ID = "variedcommodities:plans";
var ULTRAVALUE_ID = "variedcommodities:satchel";


//Coin Items for the physical currency
var _COINITEMS = { //MUST BE FROM LOW TO HIGH
    '1c': LOWVALUE_ID,
    '5c': LOWVALUE_ID,
    '10c': LOWVALUE_ID,
    '20c': LOWVALUE_ID,
    '50c': LOWVALUE_ID,
    '1g': LOWVALUE_ID,
    '2g': LOWVALUE_ID,
    '5g': MIDVALUE_ID,
    '10g': MIDVALUE_ID,
    '20g': MIDVALUE_ID,
    '50g': MIDVALUE_ID,
    '100g': MIDVALUE_ID,
    '200g': MIDVALUE_ID,
    '500g': MIDVALUE_ID,
    '1k': HIGHVALUE_ID,
    '2k': HIGHVALUE_ID,
    '10k': HIGHVALUE_ID,
    '20k': HIGHVALUE_ID,
    '50k': HIGHVALUE_ID,
    '100k': HIGHVALUE_ID,
    '1m': ULTRAVALUE_ID,
    '2m': ULTRAVALUE_ID,
    '5m': ULTRAVALUE_ID,
    '10m': ULTRAVALUE_ID,
    '20m': ULTRAVALUE_ID,
    '50m': ULTRAVALUE_ID,
    '100m': ULTRAVALUE_ID,
    '200m': ULTRAVALUE_ID,
    '500m': ULTRAVALUE_ID,
    '1b': ULTRAVALUE_ID,
    '2b': ULTRAVALUE_ID,
    '5b': ULTRAVALUE_ID,
    '10b': ULTRAVALUE_ID,
    '20b': ULTRAVALUE_ID,
    '50b': ULTRAVALUE_ID,
    '100b': ULTRAVALUE_ID,
    '200b': ULTRAVALUE_ID,
    '500b': ULTRAVALUE_ID,
    '1t': ULTRAVALUE_ID,
    '2t': ULTRAVALUE_ID,
    '5t': ULTRAVALUE_ID,
    '10t': ULTRAVALUE_ID,
    '20t': ULTRAVALUE_ID,
    '50t': ULTRAVALUE_ID,
    '100t': ULTRAVALUE_ID,
    '200t': ULTRAVALUE_ID,
    '500t': ULTRAVALUE_ID,
    '1q': ULTRAVALUE_ID,
};//LANGUAGE settings
var _MSG = {
    //Error Strings
	"cmdNotFound": "&cCould not find this command!",
	"cmdNoPerm": "&cYou don't have permission to this command!",
	"argNotValid": "&c'{argName}' is not a valid id/name! It can only contain: &o{allowed}",
	"argToShort": "&c'{argName}' is too short! (Min. {allowed} characters)",
	"argNoColor": "&c'{argName}' cannot contain colorcoding!",
	"argEnum": "&c'{argName}' must be one of the following: &o{allowed}!",
	"argNaN": "&c'{argName}' is not a number!",
	"argMax": "&c'{argName}' cannot be bigger than {allowed}!",
	"argMin": "&c'{argName}' cannot be smaller than {allowed}!",
	"argNotExists": "&c{type} '{argVal}' does not exists!",
	"argExists": "&c{type} '{argVal}' already exists!",
	"argColor": "&cColors must be one of the following: {allowed}!",
	"argColorEffect": "&cChat effects must be one of the following: {allowed}!",
	"argItemAttr": "&cItem attributes must be one of these {allowed}!",
	"argBool": "&c{dataType} must be true or false!",
	//button texts
    "undoBtnText": "Undo",
    "refreshBtnText": "Refresh"
};
//===== CONFIG
var CONFIG_SERVER = {
    "NAME": "TestServer",
    "TITLE": "&5&lTestServer",
    "PREFIX": "&5&l",
    "BAR_OPEN": "&r&l[=======] &r",
    "BAR_CLOSE": "&r&l [=======]&r",
    "DEFAULT_PERM_TEAMS": [
        "Owner",
        "Developer"
    ],
    "DEFAULT_PERM_PLAYERS": [],
    "DEFAULT_TEAM_JOIN": "Player",
    "DEVELOPMENT_MODE": false,
    "USE_DISK": "DEFAULT",
    "LICENSE_KEY": "",
    "FILE_DISKS": {
        "DEFAULT": {
            "path": "{worldname}/customnpcs/scripts/world_data.json"
        },
        "CST_DATA": {
            "path": "CustomServerTools/data/data.json"
        }
    },
    "CHAT_COLOR_CURRENCY": "credit",
    "MONEY_POUCH_SCRIPT": null,
    "REGION_TYPES": {
        "garden": {
            "build": [],
            "interact": []
        }
    }
};

var DEFAULT_MONEY = 0;

//Configure your own time units for in arguments etc!
var msTable = {
    //Reallife time
    'y': 31556926000, //365.25 days for taking leap years into account
    'mon': 2629743830, //
    'w': 604800000,
    'd': 86400000,
    'h': 3600000,
    'min': 60000,
    's': 1000,
    'ms': 1,
};


function handleError(error, logsToConsole, target) {
	if(typeof(logsToConsole) == typeof(undefined) || logsToConsole === null) { logsToConsole = true; }
	if(typeof(target) == typeof(undefined) || target === null) { target = null; }
    var world = API.getIWorld(0);

    var errinfo = "";
    if(error.fileName) {
        errinfo += "$6Error in "+error.fileName+(error.lineNumber?':'+error.lineNumber:"")+"\n";
    }
    if(error.message) {
        errinfo += "$e"+error.message.replaceAll("&", "")+"\n";
    }
    if(error.stack) {
        errinfo += "$r\n"+error.stack+"\n";
    }
    var errorTxt = "&cScript error in "+error.fileName+(error.lineNumber? ":"+error.lineNumber : '')+"! &n&c[Error Info]{*|show_text:"+errinfo.replaceAll("&", "")+"}&r";
    if(logsToConsole) {
        print("Error in "+error.fileName+":"+error.lineNumber+"\n"+error.message+"\n\n"+error.stack);
    }
    executeCommandGlobal("/tellraw "+(target||"@a")+" "+strf(errorTxt));
}

var File = Java.type("java.io.File");
var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var CHARSET_UTF_8 = Java.type("java.nio.charset.StandardCharsets").UTF_8;


function mkPath(path) {
    var expath = path.split("/");
    var curpath = "";
    for (var ex in expath) {
        var expt = expath[ex];
        curpath += (curpath == "" ? "" : "/") + expt;
        var pfile = new File(curpath);
        if (!pfile.exists()) {
            if (expt.match(/[\w]+\.[\w]+/) === null) { //is dir?
                pfile.mkdir();
            } else {
                pfile.createNewFile();
            }
        }
    }
}

function readDir(dirPath) {
    var res = [];
    var files = new File(dirPath).listFiles();
    for(var id in files) {
var file = files[id];
        if (file.isDirectory())
            res = res.concat(readDir(file.toString()));
        else
            res.push(Java.from(readFile(file.toString())).join("\n").replace(/\t/g, "  "));
    }
    return res;
}

function readFileAsString(filePath) {
    try {
        return Java.from(readFile(filePath)).join("\n").replace(/\t/g, "  ");

    } catch (exc) {
        return readFile(filePath).join("\n").replace(/\t/g, "  ");
    }
}


function readFile(filePath) {
    var path = Paths.get(filePath);
    try {
        var lines = Files.readAllLines(path, CHARSET_UTF_8);
        return lines;
    } catch (e) {
        return [];
    }
}

function writeToFile(filePath, text, offset, length) {
	if(typeof(offset) == typeof(undefined) || offset === null) { offset = null; }
	if(typeof(length) == typeof(undefined) || length === null) { length = null; }
    var path = Paths.get(filePath);
    try {
        var writer = Files.newBufferedWriter(path, CHARSET_UTF_8);
        writer.write(text, offset || 0, length || text.length);
        writer.close();
        return true;
    } catch (exc) {
        return false
    }
}




//Check config file
var CONFIG_FILEPATH = "config/CustomServerTools/settings.json";

function getServerProperties() {
    var proprgxs = /([\w\-.]+)\s*=([\w\W]*?)$/gm;
    var proprgx = /([\w\-.]+)\s*=([\w\W]*?)$/m;
    var propdata = {};

    (readFileAsString('server.properties').match(proprgxs) || []).forEach(function(prop) {
        var propmeta = prop.match(proprgx);
        var propname = propmeta[1];
        var propval = propmeta[2];
        if (stringIsNumeric(propval)) {
            propval = parseFloat(propval);
        } else if (stringIsBool(propval)) {
            propval = propval === 'true';
        }

        propdata[propname] = propval
    });

    return propdata;
}

function getDiskHandler(diskname) {
	if(typeof(diskname) == typeof(undefined) || diskname === null) { diskname = null; }
    diskname = diskname || CONFIG_SERVER.USE_DISK;
    if (diskname === "DEFAULT") {
        return API.getIWorld(0).storeddata;
    }
    if (Object.keys(CONFIG_SERVER.FILE_DISKS).indexOf(diskname) > -1) {
        var disk = new CSTData().useDisk(diskname);
        return disk;
    }
    return null;
}

function saveConfiguration() {
    var configFile = new File(CONFIG_FILEPATH);

    try {

        writeToFile(CONFIG_FILEPATH, JSON.stringify(CONFIG_SERVER, null, 4));


    } catch (exc) {
        handleError(exc);
    }

}

function reloadConfiguration() {
    var configFile = new File(CONFIG_FILEPATH);

    if (!configFile.exists()) {
        mkPath(CONFIG_FILEPATH);
        writeToFile(CONFIG_FILEPATH, JSON.stringify(CONFIG_SERVER, null, 4));


    }

    try {
        var loadConf = JSON.parse(readFileAsString(CONFIG_FILEPATH))
        CONFIG_SERVER = Object.assign(CONFIG_SERVER, loadConf);

        if (Object.keys(CONFIG_SERVER).sort().join(",") !== Object.keys(loadConf).sort().join(",")) {
            writeToFile(CONFIG_FILEPATH, JSON.stringify(CONFIG_SERVER, null, 4));
        }

    } catch (exc) {
        handleError(exc);
    }

}

reloadConfiguration();


var _RAWCOLORS = {
    '0': 'black',
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white',
};

var _RAWEFFECTS = {
    'o': 'italic',
    'l': 'bold',
    'k': 'magic',
    'm': 'strike',
    'n': 'underline',
    'r': 'reset'
}

var _RAWCODES = Object.keys(_RAWCOLORS).concat(Object.keys(_RAWEFFECTS));

function getColorId(name) {
    for (var i in _RAWCOLORS) {
        if (name == _RAWCOLORS[i]) {
            return i;
        }
    }
    for(var i in _RAWEFFECTS) {
var re = _RAWEFFECTS[i];
        if (name == re) {
            return i;
        }
    }
    return 'r';
}

function getColorName(id) {
    for(var i in _RAWCOLORS) {
var rc = _RAWCOLORS[i];
        if (id == i) {
            return rc;
        }
    }
    for(var i in _RAWEFFECTS) {
var re = _RAWEFFECTS[i];
        if (id == i) {
            return re;
        }
    }
    return 'white';
}

function stripColors(str) {
    for(var i in _RAWCODES) {
var rawcode = _RAWCODES[i];
        str = str.replaceAll('&' + rawcode, '');
    }

    return str;
}

function slugify(text) {
    text = stripColors(text);
    return text.toString().toLowerCase()
        .replace(/\s+/g, '_') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/__+/g, '_') // Replace multiple - with single -
        .replace(/^_+/, '') // Trim - from start of text
        .replace(/_+$/, ''); // Trim - from end of text
}

function ccs(str, af) {
	if(typeof(af) == typeof(undefined) || af === null) { af = null; }
    return colorCodeString(str, af);
}

function colorCodeString(str, allowed_formats) {
	if(typeof(allowed_formats) == typeof(undefined) || allowed_formats === null) { allowed_formats = null; }
    if (allowed_formats == null) {
        allowed_formats = Object.keys(_RAWCOLORS).concat(Object.keys(_RAWEFFECTS));
    }
    allowed_formats = removeFromArray(allowed_formats, ['x', 'y']);
    return str.replace(new RegExp("&([" + allowed_formats.join("") + "])", 'g'), '\u00A7$1').replace(/&\\/g, '&');
}

function escCcs(str, esc_formats) {
	if(typeof(esc_formats) == typeof(undefined) || esc_formats === null) { esc_formats = null; }
    if (esc_formats == null) {
        esc_formats = _RAWCODES;
    }

    return str.replace(new RegExp('&([' + esc_formats.join("") + '])', 'g'), '');
}

function parseEmotes(str, allwd, replaceOld) {
	if(typeof(allwd) == typeof(undefined) || allwd === null) { allwd = []; }
	if(typeof(replaceOld) == typeof(undefined) || replaceOld === null) { replaceOld = true; }
    if (replaceOld) {
        str = str.replaceAll(Object.values(CHAT_EMOTES), '');
    }
    for (var ce in CHAT_EMOTES) {
        var chatemote = CHAT_EMOTES[ce];
        if (allwd.length == 0 || allwd.indexOf(ce) > -1) {
            str = str.replaceAll(':' + ce + ':', chatemote);
            str = str.replaceAll(':/' + ce + '/:', ':' + ce + ':');
        }
    }
    return str;
}

function strf(str, toRaw, allowed) {
	if(typeof(toRaw) == typeof(undefined) || toRaw === null) { toRaw = true; }
	if(typeof(allowed) == typeof(undefined) || allowed === null) { allowed = null; }
	return strrawformat(str, toRaw, allowed);
}
var CHAT_CMD_RGX = /{[\s]*(?:([\w]+)[\s]*\:[\s]*([\w\W\/]+?)|\*)(?:[\s]*\|[\s]*([\w]+)[\s]*\:[\s]*([\w\W\/]+?[\s]*))?}/;
var CHAT_CMD_RGX_G = /{[\s]*(?:([\w]+)[\s]*\:[\s]*([\w\W\/]+?)|\*)(?:[\s]*\|[\s]*([\w]+)[\s]*\:[\s]*([\w\W\/]+?[\s]*))?}/g;


function strrawformat(str, toRaw, allowed) {
	if(typeof(toRaw) == typeof(undefined) || toRaw === null) { toRaw = false; }
	var rf = [];
	var txt = '';
	var ri = -1;
	var isCode = false;
	var txtColor = 'white';
	var isItalic = false;
	var isBold = false;
	var isStrike = false;
	var isUnderlined = false;
	var isObf = false;
	str = str+'&r ';

	for(var i = 0; i < str.length; i++) {
		var c = str.substr(i, 1);
		if(c == '&' || i == str.length-1) {
			//Check if new section has to be made
			if(txt.length > 0) {
				ri++;
				var cmds = [];

				rf.push([txt, txtColor, isItalic, isBold, isUnderlined, isStrike, isObf]);
				isItalic = false;
				isBold = false;
				isUnderlined = false;
				isStrike = false;
				isObf = false;
				txtColor = 'white';
				txt = '';
			}
			isCode = true;
			continue;
		} else {
			if(!isCode) {
				txt += c.toString();
			} else {
				//Check Colors
				if(typeof(_RAWCOLORS[c]) != typeof(undefined)) {
					txtColor = _RAWCOLORS[c];
				}
				//Check Markup
				switch(c.toString()) {
					case 'o': {
						isItalic = true;
						break;
					}
					case 'l': {
						isBold = true;
						break;
					}
					case 'n': {
						isUnderlined = true;
						break;
					}
					case 'm': {
						isStrike = true;
						break;
					}
					case 'k': {
						isObf = true;
						break;
					}
					case 'r': {
						isItalic = false;
						isBold = false;
						isUnderlined = false;
						isStrike = false;
						isObf = false;
						txtColor = 'white';
						break;
					}
				}
				isCode = false;
			}
		}
	}

	return (!toRaw ? rf : rawformat(rf, true));
}

function rawformat(str_pieces, fullraw, allowed) {
	if(typeof(fullraw) == typeof(undefined) || fullraw === null) { fullraw = true; }
	if(typeof(allowed) == typeof(undefined) || allowed === null) { allowed = null; }
	if(allowed == null) {
		allowed = Object.keys(_RAWCOLORS).concat(Object.keys(_RAWEFFECTS)).concat(['x', 'y']);

	}
	var txt = '';
	if(fullraw) { txt+='[""'; }

	for(var i in str_pieces) {
		var p = str_pieces[i];
		var ntext = p[0].replace(/\"/g, '\\"');
		var nm =  ntext.match(CHAT_CMD_RGX) || [];
		if(nm.length > 0) {
			p[7] = nm[1];
			p[8] = nm[2];
			p[9] = nm[3];
			p[10] = nm[4];
			ntext = ntext.replace(nm[0], '');
		}
		var pc = '{"text":"'+ntext+'"';
		if(p[1]) {
			if(allowed.indexOf(getColorId(p[1])) == -1) {
				p[1] = 'white';
			}

			pc+=',"color":"'+p[1].toString()+'"';

		}
		if(p[2]) {
			if(allowed.indexOf('o') > -1) {
				pc+=',"italic":true';
			}
		}
		if(p[3]) {
			if(allowed.indexOf('l') > -1) {
				pc+=',"bold":true';
			}
		}
		if(p[4]) {
			if(allowed.indexOf('n') > -1) {
				pc+=',"underlined":true';
			}
		}
		if(p[5]) {
			if(allowed.indexOf('m') > -1) {
				pc+=',"strikethrough":true';
			}
		}
		if(p[6]) {
			if(allowed.indexOf('k') > -1) {
				pc+=',"obfuscated":true';
			}
		}

		if(p[7] && p[8]) { pc+=',"clickEvent":{"action":"'+p[7]+'","value":"'+p[8]+'"}'; }
		if(p[9] && p[10]) { pc+=',"hoverEvent":{"action":"'+p[9]+'","value":"'+ccs((p[10]||"").replace(/\$/g, '\u00A7'),allowed)+'"}'; }
		pc += '}';


		txt+=( fullraw ? ',' : '' )+pc.toString();
	}

	if(fullraw) {
		txt += ']';
	}

	return txt;
}

/**
 * 
 * @param {Number} value Current value
 * @param {Number} max Maximum value
 * @param {Number} length Character length
 * @param {String||'|'} progChar Progressbar character
 * @param {String} fillColor Filled color code '&a'
 * @param {String} leftColor Filles color code '&c'
 */
function progressBar(value, max, length, progChar, fillColor, leftColor, opener, closer){
	if(typeof(progChar) == typeof(undefined) || progChar === null) { progChar = null; }
	if(typeof(fillColor) == typeof(undefined) || fillColor === null) { fillColor = '&a'; }
	if(typeof(leftColor) == typeof(undefined) || leftColor === null) { leftColor = '&c'; }
	if(typeof(opener) == typeof(undefined) || opener === null) { opener = '&l['; }
	if(typeof(closer) == typeof(undefined) || closer === null) { closer = '&l]'; }
	var skillBar = '&r'+opener+'&r';
	var progress = Math.floor((value/max)*length);
	var proc = Math.round(value/max*100);
	for(var i = 0; i < length; i++) {
		if(i < progress) skillBar += fillColor+(progChar||'|');
		if(i >= progress) skillBar += leftColor+(progChar||'|');
	}
	return skillBar += '&r'+closer+'&r';
}


//Send player formatted message
function tellPlayer(player, rawtext) {
    return executeCommand(player, "/tellraw " + player.getName() + " " + parseEmotes(strf(rawtext)));
}

function tellGlobal(target, text) {
    return executeCommandGlobal('/tellraw ' +target + ' ' + parseEmotes(strf(text)));
}

function tellTarget(player, target, rawtext) {
    return executeCommand(player, "/tellraw " + target + " " + parseEmotes(strf(rawtext)));
}

function tellPlayerTitle(player, rawtext, type, target) {
	if(typeof(type) == typeof(undefined) || type === null) { type = "actionbar"; }
    return executeCommand(player, "/title " + (target || player.getName()) + " " + type + " " + parseEmotes(strf(rawtext)))
}
//Send player multiple formatted messages from array
function storytellPlayer(player, ar) {
    for(var i in ar) {
var ari = ar[i];
        tellPlayer(player, ari);
    }
}

//Get server title bar for displaying
//TO-DO: Placeholders instead of multiple variables
function getTitleBar(title, showServerName) {
	if(typeof(showServerName) == typeof(undefined) || showServerName === null) { showServerName = true; }
    return CONFIG_SERVER.BAR_OPEN + (showServerName ? CONFIG_SERVER.TITLE + " " : CONFIG_SERVER.PREFIX) + title + CONFIG_SERVER.BAR_CLOSE;
}

function getNavBar() {
    return '&r[== &e[:sun: Menu]{run_command:!menu|show_text:$eClick to show menu or do $o!menu}&r ==]';
}

function getUndoBtn(undo_cmds, hoverText) {
	if(typeof(hoverText) == typeof(undefined) || hoverText === null) { hoverText = null; }
    return "&r[" + _MSG['undoBtnText'] + "{run_command:!chain ;" + undo_cmds.join(";") + (hoverText == null ? "" : "|show_text:" + hoverText.toString()) + "}&r]";
}


var rgx_booktag = /^#(\w+)(?:\s+([\w\W]+?))??\n?$/gm;
var rgx_booktaginfo = /^#(\w+)(?:\s+([\w\W]+?))??$/m;

function generateBook(w, bookstring) {
	var book = w.createItem("minecraft:written_book", 0, 1);
	var bnbt = book.getNbt();
    var pages = bookstring.split("#ENDPAGE");

	var putpages = [];
	for(var p in pages) {
		var page = pages[p];

		var booktags = page.match(rgx_booktag);
		for(var b in booktags) {
			var bt = booktags[b];
			
			var btinfo = bt.match(rgx_booktaginfo);
			switch(btinfo[1]) {
				case "TITLE":
					bnbt.setString("title", parseEmotes(ccs(btinfo[2])));
					break;
				case "AUTHOR":
					bnbt.setString("author", parseEmotes(ccs(btinfo[2])));
					break;
			}
			
			page = page.replace(btinfo[0]+"\n", "");
			page = page.replace(btinfo[0], "");
			
			
		}
		
		putpages.push(strf('&0'+page.replaceAll("&r", "&r&0")));
		
	}
	
	bnbt.setList("pages", putpages);
	
	return book;
	
}


var _TIMERS = [];
/**
 * Executes a function after a certain amount of time
 * @param {int} seconds Time in seconds
 * @param {Function} callback Function to execute
 */
function runDelay(seconds, callback) {
    _TIMERS.push({
        end: new Date().getTime()+seconds*1000,
        callback: callback
    });
}

//https://pastebin.com/YVqHYiAi
/**
 * Used in tick function to let runDelay work
 */
function runDelayTick() {
    if(_TIMERS.length > 0) {
        var _newTimers = [];
        var _curTime = new Date().getTime();

        var timer;
        for(var i = 0; i < _TIMERS.length; i++) {
            timer = _TIMERS[i];
            if(_curTime >= timer.end) {
                timer.callback();
            } else {
                _newTimers.push(timer);
            }
        }

        _TIMERS = _newTimers;
    }
}

var REGEN_BLOCK = '{id:"minecraft:iron_ore",Count:1b,Damage:0s}';
var MODEL_BLOCK = '{id:"minecraft:stone",Count:1b,Damage:0s}'
var COOLDOWN_BLOCK = '{id:"minecraft:cobblestone",Count:1b,Damage:0s}';
var LAST_REGEN = 0;
var LAST_BLOCK = null;
var REGEN_TIME = 5000;

var REGEN_SIDE = SideType_UP;

var sides = [
	"down",
	"up",
	"north",
	"south",
	"west",
	"east"
];

function worldOut(msg) {
	return Java.type('noppes.npcs.api.NpcAPI').Instance().getIWorld(0).broadcast(msg);
}

function updateBlockData(block) {
	var data = block.getStoreddata();
	data_register(data, {
		"REGEN_BLOCK": REGEN_BLOCK,
		"MODEL_BLOCK": MODEL_BLOCK,
		"COOLDOWN_BLOCK": COOLDOWN_BLOCK,
		"REGEN_TIME": REGEN_TIME,
		"REGEN_SIDE": REGEN_SIDE,
	});

	REGEN_BLOCK = data.get("REGEN_BLOCK");
	MODEL_BLOCK = data.get("MODEL_BLOCK");
	COOLDOWN_BLOCK = data.get("COOLDOWN_BLOCK");
	REGEN_TIME = data.get("REGEN_TIME");
	REGEN_SIDE = data.get("REGEN_SIDE");
}

function interact(e) {
	var now = new Date().getTime();
	if(e.player.getGamemode() == 1) {
		var mItem = e.player.getMainhandItem();
		if(mItem.getName() == "minecraft:name_tag") {
			var cblock = nbtToItem(e.block.world, COOLDOWN_BLOCK);
			var rblock = nbtToItem(e.block.world, REGEN_BLOCK);
			var mblock = nbtToItem(e.block.world, MODEL_BLOCK);

			var data = e.block.getStoreddata();
			var cmd = mItem.getDisplayName();
			var opt = cmd.match(/(\w+)(?::([\w\W]+))?/)||[];
			var oItem = e.player.getOffhandItem();
			if(opt[1]) {
				var prop = opt[1];
				switch(prop) {
					//Force regeneration
					case "REGEN": {
						LAST_REGEN = 0;
						break;
					}
					//Set side
					case "REGEN_SIDE": {
						data.put("REGEN_SIDE", e.side);
						break;
					}
					//Set block to regen
					case "REGEN_BLOCK": {
						if(oItem.isBlock() || oItem.isEmpty()) {
							var nbtValue = oItem.getItemNbt().toJsonString();
							data.put("REGEN_BLOCK", nbtValue);
						}
						break;
					}
					//Set model of block when its still waiting for cooldown
					case "COOLDOWN_BLOCK": {
						if(oItem.isBlock() || oItem.isEmpty()) {
							data.put("COOLDOWN_BLOCK", oItem.getItemNbt().toJsonString());
						}
						break;
					}
					//Cooldown time
					case "REGEN_TIME": {
						if(opt[2]) { data.put("REGEN_TIME", getStringTime(opt[2])); }
						break;
					}
					//Set model of block when cooldown reached
					case "MODEL_BLOCK": {
						if(oItem.isBlock()) {
							data.put("MODEL_BLOCK", oItem.getItemNbt().toJsonString());
						}
						break;
					}
					//Info about regen ore
					case "INFO": {
						var infotxt = [
							"&l[======]&r &a&lRegen Ore Info &l[=======]",
							"&6Regen Time: &e"+getTimeString(REGEN_TIME),
							"&6Next regen in: &e"+getTimeString(((LAST_REGEN||now)+REGEN_TIME) - now, ['ms']),
							"&6Cooldown Block: &e"+cblock.getDisplayName(),
							"&6Model Block: &e"+mblock.getDisplayName(),
							"&6Regen Block: &e"+rblock.getDisplayName(),
							'&6Regen Side: &e'+sides[REGEN_SIDE]
						];
						tellPlayer(e.player, infotxt.join("\n"));
						break;
					}
					//Get regen ore block as item
					case "COPY": {
						var blockItem = e.player.world.createItem("customnpcs:npcscripted", 0, 1);
						blockItem.setCustomName(ccs("&3"+rblock.getDisplayName()+" ("+sides[REGEN_SIDE]+")"));
						blockItem.setLore([
							ccs("&6Regen Time: &e"+getTimeString(REGEN_TIME)),
							ccs("&6Cooldown Block: &e"+cblock.getDisplayName()),
							ccs("&6Model Block: &e"+mblock.getDisplayName()),
							ccs("&6Regen Block: &e"+rblock.getDisplayName())
						]);

						blockItem.getNbt().setCompound("BlockEntityTag", e.block.getTileEntityNBT());
						e.player.giveItem(blockItem);
						break;
					}
					//Gen help book
					case "HELP": {
						var helptxt = 
							"#TITLE &6&lRegen Ore Manualll\n"+
							"#AUTHOR &2&oRunonstof\n"+
							"&0&lREGEN BLOCK\n\n"+
							"\&0This is the manual of how\n"+
							"to configure your regen block\n\n"+
							"Goto next page to get started\n"+
							"#ENDPAGE \n"+
							"&0&lCONFIGURATION\n"+
							"&0Rename a &0&oName Tag&0 with\n"+
							"One of these: (and right click)\n\n"+
							"&8&oHELP &4&l[?]{*|show_text:$7Gives you this book...}&0\n"+
							"&8&oREGEN &4&l[?]{*|show_text:$7Sets the cooldown back to 0, block regens.\nI assume if you wanna test things youre not gonna wait ;-)}&0\n"+
							"&8&oREGEN_SIDE &4&l[?]{*|show_text:$7Sets this side of the block the side where the block regens\n$7$oMulti sides support in 2.0}&0\n"+
							"&0&o\nMore on next page\n"+
							"#ENDPAGE\n"+
							"&8&oREGEN_BLOCK &4&l[?]{*|show_text:$7Sets the $7$oblock in your offhand$7 as regen block, like iron ore.}&0\n"+
							"&8&oCOOLDOWN_BLOCK &4&l[?]{*|show_text:$7Sets the $7$oblock in your offhand$7 as cooldown block.\nThis block will be in the place of regen block when its waiting for cooldown.}&0\n"+
							"&8&oREGEN_TIME:&8&o&lTIME &4&l[?]{*|show_text:$7Sets regen time.\n\n$7$lTIME NOTATION\n$7$o2y4mon3d6h8min3s800ms\n$7or can be as simple as $7$o5min}&0\n"+
							"&8&oMODEL_BLOCK &4&l[?]{*|show_text:$7Sets the $7$oblock in your offhand$7 as model of $7$oregen block itself}&0\n"+
							"&8&oINFO &4&l[?]{*|show_text:$7Outputs info about regen block in chat}&0\n"+
							"&8&oCOPY &4&l[?]{*|show_text:$7Gives the regen block to you as item so you can place more blocks with the same settings!}&0\n"
							;
						var helpbook = generateBook(e.block.world, helptxt);
						e.player.giveItem(helpbook);
						break;
					}

				}

				tellPlayer(e.player, "&aChanged property '"+prop+"'!");
			}
		} else {
			tellPlayer(e.player, "&eUse a nametag &e&othat is renamed to HELP{*|show_text:$6Hey you found me, madlad\n$6$oMade by Runonstof}&r&e to see more details for regen ore.");
		}
		updateBlockData(e.block);
	}
}
/*
{"extra":[{"bold":true,"color":"black","text":"REGEN BLOCK\n\n"},{"color":"black","text":"This is the manual of how\nto configure your regen block\n\nGoto next page to get started"}],"text":""}
*/
function nbtToItem(w, nbt) {
	var nbtObject = API.stringToNbt(nbt);
	if(nbtObject.getString('id') == 'minecraft:air') {
		return w.createItem('minecraft:air', 0, 0);
	}
	return w.createItemFromNbt(nbtObject);
}

function init(e) {
	updateBlockData(e.block)
	e.block.setHardness(999);
}

function timer(e) {
	if(e.id == 1) {
		var dropItems = e.block.world.getNearbyEntities(e.block.getPos(), 2, EntityType_ITEM);
		for(var d in dropItems) {
			if(dropItems[d].getName() == e.block.world.createItemFromNbt(e.API.stringToNbt(COOLDOWN_BLOCK)).getName()) {
				dropItems[d].despawn();
			}
		}

	}
}
var placeFired = false;
function tick(e) {
	var blockPos = e.block.getPos().offset(REGEN_SIDE);
	var block = e.block.world.getBlock(blockPos.x, blockPos.y, blockPos.z);

	var cblock = nbtToItem(e.block.world, COOLDOWN_BLOCK);
	var rblock = nbtToItem(e.block.world, REGEN_BLOCK);
	var mblock = nbtToItem(e.block.world, MODEL_BLOCK);

	// if(e.block.getModel().getName() != mblock.getName() && e.block.getModel().getItemDamage() != mblock.getItemDamage()) { e.block.setModel(mblock); }
	e.block.setModel(mblock);
	var now = new Date().getTime();
	

	if(block !=null) {
		if((LAST_REGEN+REGEN_TIME)-now > 0 && !placeFired) {//cooldown block
			var rwblock = e.API.getIBlock(e.block.world.getMCWorld(), blockPos.getMCBlockPos());
			if(rwblock.getName() != cblock.getName() && rwblock.getName() != rblock.getName()) {
				e.block.world.setBlock(blockPos.x, blockPos.y, blockPos.z, cblock.getName(), cblock.getItemDamage());
				
			}
			//  else if(block.getName() == rblock.getName() && !rblock.getNbt().has("BlockEntityTag")) {
			// 	LAST_REGEN = now;
			// }
		} else {//regen block
			
			if(rblock.getNbt().has("BlockEntityTag")) {

				var bet = rblock.getItemNbt().getCompound("tag").getCompound("BlockEntityTag");

				if(!placeFired && (!block.hasTileEntity()||!bet.isEqual(block.getTileEntityNBT())||false)) {
					var rwblock = e.API.getIBlock(e.block.world.getMCWorld(), blockPos.getMCBlockPos());
					// if(block.getName() != rblock.getName()) {
					// 	LAST_REGEN = now;
					// }
					var _rwblock = rwblock.setBlock(rblock.getName());
					if(_rwblock&&_rwblock.hasTileEntity()) {
						var newNbt = _rwblock.getTileEntityNBT();
						newNbt.merge(bet);
						_rwblock.setTileEntityNBT(newNbt);
					}
					LAST_REGEN = now;
				}
			} else {
				var rwblock = e.API.getIBlock(e.block.world.getMCWorld(), blockPos.getMCBlockPos());

				e.block.world.setBlock(rwblock.pos.x, rwblock.pos.y, rwblock.pos.z, rblock.getName(), rblock.getItemDamage());
			}
			
		}
	}

	runDelayTick();
}
//Test
//When block next to it mines
function neighborChanged(e) {
	var now = new Date().getTime();
	if(now < LAST_REGEN+REGEN_TIME) {
		//e.block.getTimers().forceStart(1, 10, false);
		var dropItems = e.block.world.getNearbyEntities(e.block.getPos(), 2, EntityType_ITEM);
		for(var d in dropItems) {
			if(dropItems[d].getName() == e.block.world.createItemFromNbt(e.API.stringToNbt(COOLDOWN_BLOCK)).getName()) {
				dropItems[d].despawn();
			}
		}
	} else {
		
		var rblock = nbtToItem(e.block.world, REGEN_BLOCK);
		var blockPos = e.block.getPos().offset(REGEN_SIDE);
		var rwblock = e.API.getIBlock(e.block.world.getMCWorld(), blockPos.getMCBlockPos());
			
		if(rwblock.getName() != rblock.getName()) {
			LAST_REGEN = now;
		}
	}
	
}


function timer(e) {
	
}