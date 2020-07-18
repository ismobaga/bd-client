// Set of objects.  Requires a .toString() overload to distinguish objects.
var ObjectSet = function ()
{
    this.items = {};
    this.item_count = 0;
};
// ObjectSet.prototype = Object.create(Set.prototype);
// ObjectSet.prototype.constructor = ObjectSet;

ObjectSet.prototype.contains = function (x)
{
    return Object.prototype.hasOwnProperty.call(this.items, x.id);
};

ObjectSet.prototype.add = function (x)
{
    if (!this.contains(x))
    {
        this.items[x.id] = x;
        this.item_count++;
    }

    return this;
};

ObjectSet.prototype.remove = function (x)
{
    if (this.contains(x))
    {
        delete this.items[x.id];
        this.item_count--;
    }

    return this;
};

ObjectSet.prototype.clear = function ()
{
    this.items = {};
    this.item_count = 0;

    return this;
};

ObjectSet.prototype.isEmpty = function ()
{
    return this.item_count === 0;
};

ObjectSet.prototype.count = function ()
{
    return this.item_count;
};

ObjectSet.prototype.values = function ()
{
    var i, ret = [];

    for (i in this.items)
    {
        console.log(i);
        // if (this.items.hasOwnProperty(i))
        if(Object.prototype.hasOwnProperty.call(this.items, i))
            ret.push(this.items[i]);
    }
    console.log(ret)

    return ret;
};

export  {ObjectSet};
export default ObjectSet;