FROM ruby:2.5.0
RUN apt-get update -qq && apt-get install
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp


EXPOSE 3000

RUN rake db:create
RUN rake db:migrate
run rake db:mongoid:create_indexes
# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]