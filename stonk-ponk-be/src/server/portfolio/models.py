from django.db import models
import uuid

# Create your models here.

class Portfolio(models.Model) :
    email = models.EmailField(('email address'), unique=True)
    stocks = models.ManyToManyField("PortfolioStock", through = 'StockOwnership')
    
    def add_stock(self, ticker_id, entry_time, amount_bought) :
        # get this from market price
        entry_price = 10

        ownership = StockOwnership.objects.create(owner = self, stock = ticker_id, VWAP = entry_price, volume = amount_bought)
        transaction = Transaction.objects.create(purchase_date = entry_time, stockOwnership = ownership)

   
   # def remove_whole_transaction(uuid):
   #     UUID_to_remove = uuid.UUID(uuid); 
   #     transaction = Transactions.objects.get(id = UUID_to_remove)
   #     #get stockownership from transaction
   #     transaction.delete()
   #     #search transactions matching on stockownership
   #     #if empty, delete stock ownership

   # def remove_partial_transaction(uuid):

   # def remove_all_transactions(ticker):

   # def get_all_transactions_for_stock(ticker):

class PortfolioStock(models.Model) :
    ticker = models.CharField(max_length = 20)


class StockOwnership(models.Model): 

    owner = models.ForeignKey("Portfolio", on_delete = models.CASCADE)
    stock = models.ForeignKey("PortfolioStock", on_delete = models.CASCADE)

    VWAP = models.FloatField()
    volume = models.IntegerField()
    
  #  def get_all_transactions():


class Transaction(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    purchase_date = models.DateField()
    stockOwnership = models.ForeignKey("StockOwnership", on_delete = models.CASCADE)

