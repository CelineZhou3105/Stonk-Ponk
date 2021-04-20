import datetime
import time

C_DEFAULT_CACHE_MAX = 100000

class CacheExpired(Exception):
    pass

class CacheMiss(Exception):
    pass


class cache():
    def __init__(self, ttl, max_items=C_DEFAULT_CACHE_MAX):
        self.blob = {}
        self.ttl = ttl
        self.max_items = max_items

    def __call__(self, func):
        def inner(*args, **kwargs):
            entry = str((args[1:], kwargs))
            try:
                return self.get_data(entry)
            except CacheExpired:
                self.eject(entry)
            except CacheMiss:
                # cache miss
                pass
            ret = func(*args, **kwargs)
            self.cleanup()
            self.insert(entry, ret)
            return ret 
        return inner

    def get_data(self, entry):
        print(entry)
        try:
            ref = self.blob[entry]
            if self.check_expired(entry):
                raise CacheExpired()
            ref["last"] = datetime.datetime.now()
            return ref["data"]
        except KeyError:
            raise CacheMiss()

    def check_expired(self, entry):
        return datetime.datetime.now() > self.blob[entry]["expiry"]

    def cleanup(self):
        if len(self.blob) < self.max_items:
            return
        # cache is getting too big 

        # removing expired entries
        for entry in self.blob.keys():
            if self.check_expired(entry):
                self.eject(entry)

        # LRU ejection to half the size of the max cache
        entries = sorted(list(self.blob.keys()), key=lambda x : self.blob[x]["last"])

        for entry in entries[:max(len(self.blob) - self.max_items//2, 0)]:
            self.eject(entry)

    def insert(self, entry, data):
        curr_time = datetime.datetime.now()
        self.blob[entry] = { "data" : data, "expiry": curr_time.now()+self.ttl, "last": curr_time}

    def eject(self, entry):
        self.blob.pop(entry)
